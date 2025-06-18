# test_strategy_generation.py
import requests
import json

def test_strategy_generation():
    url = "http://localhost:8000/api/investment-advisor/generate-strategy"
    
    payload = {
        "risk_tolerance": "moderate",
        "growth_goals": ["retirement-planning", "capital-preservation"],
        "min_investment": 5000,
        "max_investment": 15000
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        print("API Response:")
        print(json.dumps(data, indent=2))
        
        if "strategies" in data and len(data["strategies"]) > 0:
            print(f"\nSuccessfully received {len(data['strategies'])} strategies!")
            return True
        else:
            print("\nNo strategies found in the response")
            return False
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    test_strategy_generation()