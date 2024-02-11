from django.db import models
from cloudinary_storage.storage import RawMediaCloudinaryStorage

class Mp3(models.Model):
    name = models.CharField(max_length=24)
    sound_file = models.FileField(
        upload_to='mp3/',
        null=True,
        blank=True,
        storage=RawMediaCloudinaryStorage(),
    )
