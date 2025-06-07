import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    logger.error("API key not found. Please set GEMINI_API_KEY in your .env file.")
    exit(1)

# Configure Gemini API
genai.configure(api_key=api_key)

def test_specific_model():
    model_name = "models/gemini-2.0-pro-exp-02-05"
    
    print(f"Testing specific model: {model_name}")
    
    # Check if model is available
    try:
        models = genai.list_models()
        available_models = [model.name for model in models]
        
        if model_name in available_models:
            print(f"✅ Model {model_name} is available!")
        else:
            print(f"❌ Model {model_name} is NOT available.")
            print("Available models:")
            for model in available_models:
                print(f"- {model}")
            return
            
        # Test the model
        model = genai.GenerativeModel(model_name)
        
        # Simple test prompt
        prompt = """
        You are a financial advisor. Explain what ETFs are in a simple paragraph.
        """
        
        print("\nSending test prompt...")
        response = model.generate_content(prompt)
        
        if hasattr(response, 'text'):
            print("\nResponse:")
            print(response.text)
        else:
            print("\nUnexpected response format:")
            print(response)
            
    except Exception as e:
        print(f"❌ Error testing model: {str(e)}")

if __name__ == "__main__":
    test_specific_model()