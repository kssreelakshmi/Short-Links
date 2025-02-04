from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model


USER = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        exclude = ('password',)

class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        exclude = ('profile_pic')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError({'password': 'Password field is required.'})

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ['username', 'email', 'phone_number', 'profile_pic']
            