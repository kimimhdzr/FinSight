from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.market_news, name='market_news'),  # URL to fetch news
]