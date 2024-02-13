import magic
import os

from django.core.exceptions import ValidationError
from django.conf import settings

def validate_is_sound_file(file):

    # Check mime type
    valid_mime_types = ['audio/mpeg']
    file_mime_type = magic.from_buffer(file.read(2048), mime=True)
    if file_mime_type not in valid_mime_types:
        raise ValidationError('Unsupported file type - must be mp3')
    
    # Check for correct file extension
    valid_file_extensions = ['.mp3']
    ext = os.path.splitext(file.name)[1]
    if ext.lower() not in valid_file_extensions:
        raise ValidationError('Unacceptable file extension')

    # Check file size against maximum in settings.py
    if file.size > settings.MAX_MP3_FILESIZE:
        raise ValidationError('File too large - max 1mb')

    
    