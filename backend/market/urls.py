from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.market_news, name='market_news'),  # URL to fetch news
    path('ticker/', views.stock_ticker, name='stock_ticker'), # URL to fetch stock data
    # path('market/klse/alpha/history/', views.klse_alpha_history),

]