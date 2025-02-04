from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ParseError, AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate




User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer    

    # @api_view(['GET'])
    # def getRoutes(request):
    #     routes = [
    #         'token',
    #         'token/refresh'
    #     ]
    #     return Response(routes)

class GetAccountRoutes(APIView):
    def get(self, request, format = None):
        routes = [
            'api/user/login',
            'api/user/signup',
        ]
        return Response(routes)

class UserSignupView(APIView):
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors,status=status.HTTP_NOT_ACCEPTABLE)
       
        context = {
            'Message' : 'User Registered Successfully',
            'data': serializer.data
        }    
        return Response(context,status=status.HTTP_201_CREATED,)
    

class UserLoginView(APIView):
   def post(self, request):
        try:
           email = request.data['email']
           password = request.data['password']
        except KeyError:
            raise ParseError('All fields must be filled')
        if email == '' or password == '':
            return Response({'error': 'Please fill all fields'}, status=status.HTTP_NOT_ACCEPTABLE)   
        if not USER.objects.filter(email=email).exists():
            raise AuthenticationFailed('User not found')
        user = authenticate(request,email=email, password=password) 
        if user is None:
            raise AuthenticationFailed('Invalid credentials')
        refresh = RefreshToken.for_user(user)
        refresh['username'] = str(user.username)

        context = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': user.is_superadmin,

        }
        return Response(context, status=status.HTTP_200_OK)
           