from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


from cloudinary_storage.storage import RawMediaCloudinaryStorage
from .validators import validate_is_sound_file




class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='images/', default='default_profile_ezh0a8'
    )
    sound_file = models.FileField(
        upload_to='mp3/',
        null=True,
        blank=True,
        storage=RawMediaCloudinaryStorage(),
        validators=[
            validate_is_sound_file,
        ]
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s profile"


def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)

post_save.connect(create_profile, sender=User)
