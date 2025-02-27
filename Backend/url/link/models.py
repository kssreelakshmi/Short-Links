from django.db import models
from User.models import Account 
from django.utils.timezone import now
from django.conf import settings
import requests


# Create your models here.

class URL_Shortener(models.Model):
    SHORTENING_TYPE_CHOICES = [
        ('random', 'Random Short URL'),
        ('custom', 'Custom Short URL'),
    ]
    user = models.ForeignKey(Account,on_delete=models.SET_NULL, null=True, blank=True)
    long_url = models.URLField()
    short_url = models.CharField(max_length=50, unique=True, blank=True)
    shortening_type = models.CharField(
        max_length=10,
        choices=SHORTENING_TYPE_CHOICES,
        default='random'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    expiry_at =  models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        """Override save to generate Bitly short URL before saving."""
        if not self.short_url:
            self.short_url = self.generate_bitly_short_url()
        super().save(*args, **kwargs)

    def generate_bitly_short_url(self):
        """Generate a short URL using Bitly API (random or custom)."""
        bitly_token = settings.BITLY_ACCESS_TOKEN
        if not bitly_token:
            raise ValueError("Bitly Access Token is missing. Set BITLY_ACCESS_TOKEN in settings.")

        headers = {"Authorization": f"Bearer {bitly_token}", "Content-Type": "application/json"}
        data = {"long_url": self.long_url}

        if self.shortening_type == 'custom' and self.short_url:
            data["custom_bitlink"] = self.short_url  # User-defined alias

        response = requests.post("https://api-ssl.bitly.com/v4/shorten", json=data, headers=headers)

        if response.status_code == 200:
            return response.json().get("link")
        else:
            print(f"Bitly API Error: {response.json()}")  # Debugging
            return None  # Return None if Bitly API fails

    def __str__(self):
        return f"{self.short_url} -> {self.long_url}"