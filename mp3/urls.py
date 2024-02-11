from django.urls import path
from . import views

urlpatterns = [
    path('mp3s/', views.Mp3List.as_view(), name="mp3s"),
]