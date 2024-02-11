from django.urls import path
from . import views

urlpatterns = [
    path('mp3s/', views.Mp3List.as_view(), name="mp3s"),
    path('mp3s/<int:pk>/', views.Mp3Detail.as_view(), name="mp3_detail"),
]