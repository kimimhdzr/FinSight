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

# Configure Gemini API with proper error handling
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    logging.error("GEMINI_API_KEY not found in environment variables")
    raise ValueError("GEMINI_API_KEY is not set in .env file")

genai.configure(api_key=api_key)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("ai_service.log"), logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

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
        min_investment: int,
        max_investment: int
    ) -> Dict[str, Any]:
        """
        Generate investment strategy recommendations based on user criteria using Google's Gemini
        """
        # Format the prompt for the AI model
        prompt = f"""
        Generate an investment strategy recommendation based on the following criteria:
        
        Risk Tolerance: {risk_tolerance}
        Growth Goals: {', '.join(growth_goals)}
        Investment Range: ${min_investment} - ${max_investment}
        
        Provide the recommendation in JSON format with the following structure:
        {{
            "strategies": [
                {{
                    "name": "Strategy name",
                    "targetReturn": "Expected percentage return",
                    "riskLevel": "Risk level description",
                    "timeHorizon": "Recommended time horizon",
                    "allocation": "Asset allocation percentages",
                    "description": "Detailed strategy description"
                }}
            ],
            "explanation": "Overall explanation of recommendations"
        }}
        
        Ensure the response is in valid JSON format without any additional text.
        """
        
        try:
            # Call Gemini API to generate the investment strategy
            response = self.gemini_model.generate_content(prompt)
            
            # Extract the text response
            content = response.text
            
            # Try to parse as JSON
            try:
                strategy_data = json.loads(content)
                return strategy_data
            except json.JSONDecodeError:
                # If parsing fails, return a structured response anyway
                print(f"Failed to parse JSON from Gemini response: {content}")
                return {
                    "strategies": [
                        {
                            "name": "Balanced Portfolio",
                            "targetReturn": "8-10%",
                            "riskLevel": risk_tolerance.capitalize(),
                            "timeHorizon": "5+ years",
                            "allocation": "60% stocks, 30% bonds, 10% alternatives",
                            "description": "This is a fallback recommendation based on your criteria."
                        }
                    ],
                    "explanation": "Based on your risk tolerance and goals, I recommend a balanced approach.",
                    "raw_response": content
                }
        
        except Exception as e:
            print(f"Error generating investment strategy: {str(e)}")
            raise

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
            logger.info(f"Sending prompt to Gemini: {prompt}")
            
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

ai_service = AIService(ai_model_url="http://localhost:5000/ai")  # Replace with actual AI model URL