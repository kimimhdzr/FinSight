from decouple import config
import requests
from django.http import JsonResponse

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
