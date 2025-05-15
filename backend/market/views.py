from decouple import config
import requests
from django.http import JsonResponse
from datetime import datetime

# General market news
def market_news(request):
    FINNHUB_API_KEY = config("FINNHUB_API_KEY")  # Loaded from .env

    url = 'https://finnhub.io/api/v1/news'
    params = {
        'category': 'general',
        'token': FINNHUB_API_KEY
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        news = response.json()
        return JsonResponse(news[:30], safe=False)

    return JsonResponse({'error': 'Failed to fetch news'}, status=500)

# Stocks data
def stock_ticker(request):
    FINNHUB_API_KEY = config("FINNHUB_API_KEY")
    symbols = ["AAPL", "GOOGL", "AMZN", "TSLA", "MSFT", "NFLX", "NVDA"]

    quotes = []
    for symbol in symbols:
        # Get stock quote data (current price)
        url_quote = f'https://finnhub.io/api/v1/quote'
        params_quote = {'symbol': symbol, 'token': FINNHUB_API_KEY}
        res_quote = requests.get(url_quote, params=params_quote)

        # Get company profile data (company name)
        url_profile = f'https://finnhub.io/api/v1/stock/profile2'
        params_profile = {'symbol': symbol, 'token': FINNHUB_API_KEY}
        res_profile = requests.get(url_profile, params=params_profile)

        if res_quote.status_code == 200 and res_profile.status_code == 200:
            data_quote = res_quote.json()
            data_profile = res_profile.json()
            
            quotes.append({
                "companyName": data_profile.get("name", "Unknown"),
                "symbol": symbol,
                "price": data_quote.get("c", 0),
                "change": data_quote.get("dp", 0),
            })

    return JsonResponse(quotes, safe=False)

# def klse_alpha_history(request):
#     symbol = request.GET.get("symbol", "1155.KL")  # default to Maybank
#     ALPHA_API_KEY = config("ALPHA_VANTAGE_API_KEY")

#     url = f"https://www.alphavantage.co/query"
#     params = {
#         "function": "TIME_SERIES_DAILY",
#         "symbol": symbol,
#         "outputsize": "compact",  # or "full"
#         "apikey": ALPHA_API_KEY
#     }

#     response = requests.get(url, params=params)

#     if response.status_code != 200:
#         return JsonResponse({"error": "Failed to fetch data"}, status=500)

#     data = response.json()
#     if "Time Series (Daily)" not in data:
#         return JsonResponse({"error": "Invalid symbol or no data available"}, status=404)

#     time_series = data["Time Series (Daily)"]
#     result = [
#         {
#             "date": date,
#             "price": round(float(info["4. close"]), 2)
#         }
#         for date, info in sorted(time_series.items(), reverse=True)[:30]
#     ]

#     return JsonResponse(result[::-1], safe=False)  # reverse to chronological