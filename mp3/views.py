from django.shortcuts import render
from .serializers import Mp3Serializer
from rest_framework import generics
from .models import Mp3


class Mp3List(generics.ListCreateAPIView):
    queryset = Mp3.objects.all()
    serializer_class = Mp3Serializer
    permission_classes = []
