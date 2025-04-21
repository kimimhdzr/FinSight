from django.urls import path
from . import views


urlpatterns = [
    path('test-post/', views.test_connectivity, name='test_connectivity'),
]
