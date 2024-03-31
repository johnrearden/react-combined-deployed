from rest_framework import serializers
from .models import Mp3


class Mp3Serializer(serializers.ModelSerializer):

    # sound_file = serializers.FileField(required=False)

    class Meta:
        model = Mp3
        fields = ['id', 'name', 'sound_file']