import os
import json
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
import requests
import google.generativeai as genai
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging first (before any potential API key errors)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("ai_service.log"), logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Configure Gemini API with proper error handling
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    logger.error("GEMINI_API_KEY not found in environment variables")
    raise ValueError("GEMINI_API_KEY environment variable is not set")

# Configure Gemini with the API key (don't log the key!)
genai.configure(api_key=api_key)

class AIService:
    def __init__(self, ai_model_url: str):
        self.ai_model_url = ai_model_url
        
        try:
            # List available models to log for debugging
            available_models = [model.name for model in genai.list_models()]
            logging.info(f"Available Gemini models: {available_models}")
            
            # Use the specific model you want
            specific_model = "models/gemini-2.0-flash"
            
            # Check if the specific model is available
            if specific_model in available_models:
                model_name = specific_model
                logging.info(f"Using requested model: {specific_model}")
            else:
                logging.warning(f"Requested model {specific_model} not found in available models")
                # Find a fallback model if specified one isn't available
                fallback_models = [
                    "models/gemini-2.0-pro-exp",
                    "models/gemini-1.5-pro",
                    "models/gemini-1.5-flash"
                ]
                
                model_name = None
                for model in fallback_models:
                    if model in available_models:
                        model_name = model
                        logging.warning(f"Falling back to {model} instead")
                        break
                
                if not model_name:
                    # Last resort - use any non-embedding model
                    for model in available_models:
                        if not "embedding" in model.lower():
                            model_name = model
                            logging.warning(f"Using fallback model: {model}")
                            break
                    
                    if not model_name:
                        # Absolute last resort - use the first available model
                        model_name = available_models[0]
                        logging.warning(f"Using first available model: {model_name}")
            
            # Initialize the model
            self.gemini_model = genai.GenerativeModel(model_name)
            logging.info(f"AIService initialized with Gemini model: {model_name}")
            
        except Exception as e:
            logging.error(f"Error initializing Gemini model: {str(e)}")
            # Still create the instance but we'll handle errors in the methods
            self.gemini_model = None

    def get_investment_advice(self, user_input: dict) -> dict:
        try:
            response = requests.post(self.ai_model_url, json=user_input)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail=str(e))

    def validate_input(self, input_data: dict) -> bool:
        # Implement validation logic for input_data
        return True  # Placeholder for actual validation logic

    def process_request(self, input_data: dict) -> dict:
        if not self.validate_input(input_data):
            raise HTTPException(status_code=400, detail="Invalid input data")
        
        advice = self.get_investment_advice(input_data)
        return advice

    def generate_investment_strategy(
        self,
        risk_tolerance: str,
        growth_goals: List[str],
        min_investment: float,
        max_investment: float
    ) -> Dict:
        """
        Generate personalized investment strategies based on the user's profile
        """
        logger = logging.getLogger(__name__)
        
        try:
            # Create a detailed prompt for generating investment strategies
            prompt = f"""
            Generate three comprehensive investment strategies based on the following investor profile:
            - Risk tolerance: {risk_tolerance}
            - Growth goals: {', '.join(growth_goals)}
            - Investment range: ${min_investment} - ${max_investment}
            
            For each strategy, provide:
            1. A descriptive strategy name that reflects the approach
            2. Expected target return range (as a percentage)
            3. Risk level classification
            4. Recommended time horizon
            5. Specific asset allocation breakdown (with percentages)
            
            Format the response as a JSON array of strategy objects with the following keys:
            - name: The strategy name
            - targetReturn: The target return range
            - riskLevel: The risk level
            - timeHorizon: The recommended time horizon
            - allocation: The specific asset allocation breakdown
            
            Example:
            [
              {{
                "name": "Conservative Income Portfolio",
                "targetReturn": "4-6%",
                "riskLevel": "Low",
                "timeHorizon": "3+ years",
                "allocation": "30% stocks, 60% bonds, 10% cash"
              }},
              ...
            ]
            """
            
            # Log the prompt for debugging
            logger.info(f"Generating investment strategies for {risk_tolerance} risk tolerance")
            
            # Call Gemini API to generate investment strategies
            response = self.gemini_model.generate_content(prompt)
            
            if not response or not hasattr(response, 'text'):
                logger.error("No valid response from AI model")
                return {"strategies": self._generate_fallback_strategies(risk_tolerance, growth_goals, min_investment, max_investment)}
                
            # Extract and parse the JSON from the response
            response_text = response.text
            
            # Look for JSON array in the response
            import re
            json_match = re.search(r'\[\s*\{.*\}\s*\]', response_text, re.DOTALL)
            
            if json_match:
                json_str = json_match.group(0)
                try:
                    strategies = json.loads(json_str)
                    logger.info(f"Successfully generated {len(strategies)} strategies")
                    
                    # Process strategies to ensure allocation is always a string
                    for strategy in strategies:
                        if isinstance(strategy.get('allocation'), dict):
                            strategy['allocation'] = ', '.join([f"{value} {key}" for key, value in strategy['allocation'].items()])
                        elif not isinstance(strategy.get('allocation'), str):
                            strategy['allocation'] = str(strategy.get('allocation', 'Diversified allocation'))
                            
                    return {"strategies": strategies}
                except json.JSONDecodeError as e:
                    logger.error(f"Error parsing JSON from AI response: {e}")
            else:
                logger.error("Could not find JSON array in AI response")
            
            # If we couldn't extract proper JSON, try to extract strategy info using regex
            return {"strategies": self._parse_strategies_from_text(response_text)}
            
        except Exception as e:
            logger.error(f"Error generating investment strategies: {str(e)}")
            return {"strategies": self._generate_fallback_strategies(risk_tolerance, growth_goals, min_investment, max_investment)}

    def chat_response(self, message: str, context: Optional[dict] = None) -> str:
        """
        Generate a response to a user's chat message using Google's Gemini
        """
        logger = logging.getLogger(__name__)
        
        # If no model was successfully initialized, return an error
        if not self.gemini_model:
            logger.error("No Gemini model was initialized")
            return "AI service is currently unavailable. Please try again later."
            
        try:
            # Create a prompt formatting that works well with the 2.0 pro model
            if context:
                prompt = f"""
                You are FinSight, an AI-powered investment advisor. Respond to the user's question using the following context information:
                
                User's risk tolerance: {context.get('risk_tolerance', 'moderate')}
                User's growth goals: {', '.join(context.get('growth_goals', ['general growth']))}
                User's investment range: ${context.get('investment_range', {}).get('min', 0)} - ${context.get('investment_range', {}).get('max', 10000)}
                
                User's question: {message}
                """
            else:
                prompt = f"""
                You are FinSight, an AI-powered investment advisor. Provide a helpful, accurate, and concise response to this question:
                
                {message}
                """
            
            # Log the prompt for debugging
            logger.info(f"Sending prompt to Gemini about: {message[:30]}...")
            
            # For gemini-2.0 models, try different generation settings
            generation_config = {
                "temperature": 0.7,
                "top_p": 0.95,
                "top_k": 40,
                "max_output_tokens": 1024,
            }
            
            try:
                # First attempt with generation config
                response = self.gemini_model.generate_content(
                    prompt,
                    generation_config=generation_config
                )
            except Exception as config_error:
                logger.warning(f"Error with generation config: {str(config_error)}. Trying without config.")
                # If that fails, try with just the prompt
                response = self.gemini_model.generate_content(prompt)
        
            # Extract text from the response
            if hasattr(response, 'text'):
                return response.text
            elif hasattr(response, 'parts') and len(response.parts) > 0:
                return response.parts[0].text
            else:
                logger.warning(f"Unexpected response format: {type(response)}")
                return "I'm sorry, I couldn't generate a proper response at this time."
                
        except Exception as e:
            logger.error(f"Error generating chat response: {str(e)}")
            return f"I'm having trouble processing your request. Technical details: {str(e)}"

    def _parse_strategies_from_text(self, text: str) -> List[Dict]:
        """Parse strategies from unstructured text when JSON parsing fails"""
        logger = logging.getLogger(__name__)
        
        try:
            strategies = []
            # Look for patterns like "Strategy 1:", "Strategy 2:" etc.
            import re
            strategy_blocks = re.split(r'(?:Strategy\s+\d+:|^\d+\.)', text)
            
            # Remove empty blocks
            strategy_blocks = [block.strip() for block in strategy_blocks if block.strip()]
            
            for block in strategy_blocks[:3]:  # Limit to 3 strategies
                strategy = {}
                
                # Try to extract name
                name_match = re.search(r'(?:Name|Title):\s*([^\n]+)', block)
                if name_match:
                    strategy["name"] = name_match.group(1).strip()
                else:
                    # Try to find the first line as the name
                    first_line = block.split('\n')[0].strip()
                    if first_line and len(first_line) < 100:  # Reasonable name length
                        strategy["name"] = first_line
                    else:
                        strategy["name"] = "Investment Strategy"
                
                # Extract target return
                return_match = re.search(r'(?:Target Return|Expected Return|Return):\s*([^\n]+)', block)
                if return_match:
                    strategy["targetReturn"] = return_match.group(1).strip()
                else:
                    # Look for percentage patterns
                    percent_match = re.search(r'(\d+(?:\.\d+)?%\s*-\s*\d+(?:\.\d+)?%)', block)
                    if percent_match:
                        strategy["targetReturn"] = percent_match.group(1)
                    else:
                        strategy["targetReturn"] = "Varies"
                
                # Extract risk level
                risk_match = re.search(r'(?:Risk Level|Risk):\s*([^\n]+)', block)
                if risk_match:
                    strategy["riskLevel"] = risk_match.group(1).strip()
                else:
                    strategy["riskLevel"] = "Moderate"
                
                # Extract time horizon
                time_match = re.search(r'(?:Time Horizon|Horizon):\s*([^\n]+)', block)
                if time_match:
                    strategy["timeHorizon"] = time_match.group(1).strip()
                else:
                    strategy["timeHorizon"] = "5+ years"
                
                # Extract allocation
                allocation_match = re.search(r'(?:Allocation|Asset Allocation|Breakdown):\s*([^\n]+)', block)
                if allocation_match:
                    strategy["allocation"] = allocation_match.group(1).strip()
                else:
                    allocation_match = re.search(r'(\d+%\s*(?:stocks|equities|bonds|cash|alternatives)[\s,]*(?:\d+%\s*(?:stocks|equities|bonds|cash|alternatives)[\s,]*)*)', block, re.IGNORECASE)
                    if allocation_match:
                        strategy["allocation"] = allocation_match.group(1)
                    else:
                        strategy["allocation"] = "Diversified mix of assets"
                
                # Validate allocation type
                if isinstance(strategy["allocation"], dict):
                    # Convert allocation dictionary to string 
                    strategy["allocation"] = ", ".join([f"{value} {key}" for key, value in strategy["allocation"].items()])
                elif not isinstance(strategy["allocation"], str):
                    # If it's neither a dict nor string, convert to string
                    strategy["allocation"] = str(strategy["allocation"])
                
                strategies.append(strategy)
            
            if not strategies:
                logger.warning("Could not extract strategies from text, using fallbacks")
                return self._generate_simple_fallbacks()
                
            return strategies
            
        except Exception as e:
            logger.error(f"Error parsing strategies from text: {str(e)}")
            return self._generate_simple_fallbacks()
        
    def _generate_fallback_strategies(self, risk_tolerance: str, growth_goals: List[str], min_investment: float, max_investment: float) -> List[Dict]:
        """Generate fallback strategies based on input parameters"""
        
        has_income = "low-mid-income" in growth_goals
        has_preservation = "capital-preservation" in growth_goals
        has_retirement = "retirement-planning" in growth_goals
        
        strategies = []
        
        if risk_tolerance == "conservative":
            strategies.append({
                "name": "Income Preservation Portfolio",
                "targetReturn": "4-6%",
                "riskLevel": "Low",
                "timeHorizon": "3+ years",
                "allocation": "25% stocks, 65% bonds, 10% cash"
            })
            strategies.append({
                "name": "Dividend Focus Strategy",
                "targetReturn": "5-7%",
                "riskLevel": "Low to Moderate",
                "timeHorizon": "4+ years",
                "allocation": "35% dividend stocks, 55% bonds, 10% cash"
            })
        elif risk_tolerance == "moderate":
            strategies.append({
                "name": "Balanced Growth Portfolio",
                "targetReturn": "7-9%",
                "riskLevel": "Moderate",
                "timeHorizon": "5+ years",
                "allocation": "55% stocks, 35% bonds, 10% alternatives"
            })
            strategies.append({
                "name": "Global Diversification Strategy",
                "targetReturn": "8-10%",
                "riskLevel": "Moderate",
                "timeHorizon": "5+ years",
                "allocation": "50% US stocks, 15% international stocks, 30% bonds, 5% alternatives"
            })
        else:  # aggressive
            strategies.append({
                "name": "Growth Stock Focus",
                "targetReturn": "10-12%",
                "riskLevel": "High",
                "timeHorizon": "7+ years",
                "allocation": "80% stocks, 10% bonds, 10% alternatives"
            })
            strategies.append({
                "name": "Innovation & Growth Strategy",
                "targetReturn": "11-14%",
                "riskLevel": "Very High",
                "timeHorizon": "10+ years",
                "allocation": "85% growth stocks, 15% alternatives"
            })
        
        # Add a third strategy based on specific goals
        if has_retirement:
            # Fix ternary operator usage
            target_return = "5-7%" if risk_tolerance == "conservative" else ("8-10%" if risk_tolerance == "moderate" else "10-12%")
            risk_level = "Low to Moderate" if risk_tolerance == "conservative" else ("Moderate" if risk_tolerance == "moderate" else "Moderate to High")
            
            # Fix nested ternary operator
            if risk_tolerance == "conservative":
                allocation = "40% stocks, 50% bonds, 10% alternatives"
            elif risk_tolerance == "moderate":
                allocation = "60% stocks, 30% bonds, 10% alternatives"
            else:
                allocation = "75% stocks, 15% bonds, 10% alternatives"
                
            strategies.append({
                "name": "Retirement Planning Portfolio",
                "targetReturn": target_return,
                "riskLevel": risk_level,
                "timeHorizon": "10+ years",
                "allocation": allocation
            })
        elif has_preservation:
            # Fix ternary operator usage
            target_return = "3-5%" if risk_tolerance == "conservative" else ("5-7%" if risk_tolerance == "moderate" else "7-9%")
            risk_level = "Very Low" if risk_tolerance == "conservative" else ("Low" if risk_tolerance == "moderate" else "Moderate")
            
            # Fix nested ternary operator
            if risk_tolerance == "conservative":
                allocation = "15% stocks, 65% bonds, 20% cash"
            elif risk_tolerance == "moderate":
                allocation = "30% stocks, 60% bonds, 10% cash"
            else:
                allocation = "50% stocks, 40% bonds, 10% cash"
                
            strategies.append({
                "name": "Capital Preservation Focus",
                "targetReturn": target_return,
                "riskLevel": risk_level,
                "timeHorizon": "2-4 years",
                "allocation": allocation
            })
        elif has_income:
            # Fix ternary operator usage
            target_return = "4-6%" if risk_tolerance == "conservative" else ("6-8%" if risk_tolerance == "moderate" else "8-10%")
            risk_level = "Low" if risk_tolerance == "conservative" else ("Moderate" if risk_tolerance == "moderate" else "Moderate to High")
            
            # Fix nested ternary operator
            if risk_tolerance == "conservative":
                allocation = "30% dividend stocks, 60% bonds, 10% REITs"
            elif risk_tolerance == "moderate":
                allocation = "45% dividend stocks, 40% bonds, 15% REITs"
            else:
                allocation = "60% dividend stocks, 25% bonds, 15% REITs"
                
            strategies.append({
                "name": "Income Generation Strategy",
                "targetReturn": target_return,
                "riskLevel": risk_level,
                "timeHorizon": "3-5 years",
                "allocation": allocation
            })
        
        return strategies
        
    def _generate_simple_fallbacks(self) -> List[Dict]:
        """Generate very simple fallback strategies when all else fails"""
        return [
            {
                "name": "Conservative Portfolio",
                "targetReturn": "4-6%",
                "riskLevel": "Low",
                "timeHorizon": "3+ years",
                "allocation": "30% stocks, 60% bonds, 10% cash"
            },
            {
                "name": "Balanced Portfolio",
                "targetReturn": "7-9%",
                "riskLevel": "Moderate",
                "timeHorizon": "5+ years",
                "allocation": "60% stocks, 35% bonds, 5% alternatives"
            },
            {
                "name": "Growth Portfolio",
                "targetReturn": "9-12%",
                "riskLevel": "High",
                "timeHorizon": "7+ years",
                "allocation": "80% stocks, 15% bonds, 5% alternatives"
            }
        ]

ai_service = AIService(ai_model_url="http://localhost:5000/ai")  # Replace with actual AI model URL