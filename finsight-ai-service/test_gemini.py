import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    logger.error("No API key found. Please set GEMINI_API_KEY in your .env file.")
    exit(1)

# Configure Gemini
genai.configure(api_key=api_key)

def test_models():
    print("Testing Gemini API key and available models...")
    
    try:
        models = genai.list_models()
        print("\nAvailable models:")
        text_models = []
        
        for model in models:
            print(f"- {model.name}")
            # Look for non-embedding models
            if "embedding" not in model.name:
                text_models.append(model.name)
        
        if not text_models:
            print("\nWARNING: No text generation models found!")
            return
            
        print(f"\nFound {len(text_models)} potential text generation models")
        print(f"Will test with: {text_models[0]}")
        
        # Test with the first text model
        try:
            model = genai.GenerativeModel(text_models[0])
            response = model.generate_content("Explain what an ETF is in one sentence.")
            
            print("\nTest response:")
            if hasattr(response, 'text'):
                print(response.text)
            elif hasattr(response, 'parts'):
                print(response.parts[0].text)
            else:
                print(f"Response type: {type(response)}")
                
            print("\n✅ Success! Your Gemini API is working.")
        except Exception as e:
            print(f"\n❌ Error testing model {text_models[0]}: {str(e)}")
            
    except Exception as e:
        print(f"\n❌ Error listing models: {str(e)}")
        print("This might indicate an invalid API key or network issue.")

if __name__ == "__main__":
    test_models()