from rest_framework import serializers
from link.models import URL_Shortener


class URLShortenerSerializer(serializers.ModelSerializer):
    class Meta:
        model = URL_Shortener
        fields = ['id', 'user', 'long_url', 'short_url', 'shortening_type', 'created_at']
        read_only_fields = ['short_url', 'created_at', 'expiry_at']
