from django.db import models
from User.models import Account 
from django.utils.timezone import now
from datetime import timedelta
import random
import string


# Create your models here.

class URL_Shortener(models.Model):
    SHORTENING_TYPE_CHOICES = [
        ('random', 'Random Short URL'),
        ('custom', 'Custom Short URL'),
    ]
    user = models.ForeignKey(Account,on_delete=models.SET_NULL, null=True, blank=True)
    long_url = models.URLField()
    short_url = models.CharField(max_length=20, unique=True, blank=True)
    shortening_type = models.CharField(
        max_length=10,
        choices=SHORTENING_TYPE_CHOICES,
        default='random'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    expiry_at =  models.DateTimeField(null=True, blank=True)


    def save(self, *args, **kwargs):
        if self.shortening_type == 'random' and not self.short_url:
            self.short_url = self.generate_unique_short_url()
        
        # Set expiry if not provided (e.g., default 30 days)
        if not self.expiry_at:
            self.expiry_at = now() + timedelta(days=30)

        super().save(*args, **kwargs)

    def generate_unique_short_url(self, length=6):
        """Generate a unique short URL and ensure it's not already used."""
        characters = string.ascii_letters + string.digits
        while True:
            short_url = ''.join(random.choices(characters, k=length))
            if not URL_Shortener.objects.filter(short_url=short_url).exists():
                return short_url

    def __str__(self):
        return f"{self.short_url} -> {self.long_url}"