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
        exclude = ('profile_pic','groups','user_permissions',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print('1')
        # breakpoint() 
        password = validated_data.pop('password', None)
        print(validated_data)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError({'password': 'Password field is required.'})

class UserDetailsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ['username', 'email', 'phone_number', 'profile_pic']


class AdminCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields =  ['id', 'username', 'phone_number', 'email', 'profile_pic','password','is_active']

        extra_kwargs = {
            'password':{ 'write_only':True},
            'username': {'error_messages': {'required': 'Please provide the username.'}},
            'phone_number': {'error_messages': {'required': 'Phone number is required.'}},
            'email': {'error_messages': {'required': 'Email ID is required.'}},

        }
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        print(password)
        user_instance = self.Meta.model(**validated_data)
        if password is not None:
            user_instance.set_password(password)
            user_instance.is_active=True
            user_instance.save()
            
        return user_instance

class UserToggleActiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ['is_active']
    
    def update(self, instance, validated_data):
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ['username','phone_number','email','is_active']

    
    def update(self,instance,validated_data):
        instance.username = validated_data.get('username',instance.username)
        instance.email = validated_data.get('email',instance.email)
        instance.phone_number = validated_data.get('phone_number',instance.phone_number)
        instance.is_active = validated_data.get('is_active',instance.is_active)
        instance.save()
        return instance

class UserImageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ['profile_pic']
        
