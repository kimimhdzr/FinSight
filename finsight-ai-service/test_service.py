import requests
import json

BASE_URL = "http://localhost:8000/api/investment-advisor"

def test_generate_strategy():
    print("Testing strategy generation...")
    data = {
        "risk_tolerance": "moderate",
        "growth_goals": ["low-mid-income"],
        "min_investment": 1000,
        "max_investment": 5000
    }
    
    response = requests.post(f"{BASE_URL}/generate-strategy", json=data)
    if response.status_code == 200:
        print("Success! Strategy generated:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

def test_chat():
    print("\nTesting chat functionality...")
    data = {
        "message": "What are some good stocks for a beginner investor?",
        "context": {
            "risk_tolerance": "low",
            "investment_range": {"min": 1000, "max": 5000}
        }
    }
    
    response = requests.post(f"{BASE_URL}/chat", json=data)
    if response.status_code == 200:
        print("Success! AI response:")
        print(response.json()["response"])
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_generate_strategy()
    test_chat()