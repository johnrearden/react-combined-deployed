# Generated by Django 3.2.23 on 2024-02-12 11:24

import cloudinary_storage.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0006_alter_profile_sound_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='sound_file',
            field=models.FileField(blank=True, default='gospel_ighngg.mp3', null=True, storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to='mp3/'),
        ),
    ]
