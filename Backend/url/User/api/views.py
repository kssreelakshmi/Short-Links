from .serializers import *
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import ListCreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.exceptions import ParseError, AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthAdmin



USER = get_user_model()

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
        print(request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
       
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
            return Response({'error': 'Please fill all fields'}, status=status.HTTP_406_NOT_ACCEPTABLE)   
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


class AdminUserView(APIView):
    permission_classes = [IsAuthenticated,IsAuthAdmin]

    def get(self,request):
        user = USER.objects.get(id=request.user.id)
        data = UserSerializer(user).data
        context = data
        return Response(context)

   
class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        # import pdb; pdb.set_trace()
        user = USER.objects.get(id=request.user.id) 
        data = UserSerializer(user).data
        try:
            profile_pic = user.profile_pic
            data['profile_pic'] = request.build_absolute_uri('/')[:-1]+profile_pic.url
        except:
            profile_pic = ''
            data['profile_pic'] = ''

        context = data            
        return Response(context)
    
class UserDetailsUpdate(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser,FormParser)

    def post(self,request,*args,**kwargs):
        user = USER.objects.get(id = request.user.id)
        user_update_details_serializer = UserDetailsUpdateSerializer(user,data=request.data,partial=True)
        if not request.FILES:
            user_update_details_serializer.fields.pop('profile_pic',None)
        if user_update_details_serializer.is_valid():
            user_update_details_serializer.save()
            return Response(user_update_details_serializer.data,status = status.HTTP_201_CREATED)
        else:
            return Response(user_update_details_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
class AdminUserListCreateView(ListCreateAPIView):
    queryset = USER.objects.all().order_by('-date_joined') 
    serializer_class = AdminCreateSerializer
    pagination_class = PageNumberPagination
    filter_backends = [SearchFilter]
    search_fields = ['username', 'email', 'phone_number']

class ToggleUserActiveView(APIView):
    permission_classes = [IsAuthAdmin]

    def patch(self, request, user_id):
        try:
            user = USER.objects.get(id=user_id)
        except USER.DoesNotExist:

            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Toggle the user's active status
        user.is_active = not user.is_active
        user.save()

        serializer = UserToggleActiveSerializer(user)
        print('bhbdjdnjfnjdjfjbfbfb')
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AdminUserRetrieveView(RetrieveAPIView):
    queryset = USER.objects.all()
    serializer_class = AdminCreateSerializer
    lookup_field = 'id'
    
class AdminUserUpdateView(UpdateAPIView):
    permission_classes = [IsAuthAdmin]
    queryset = USER.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'id'

class AdminUserImageUpdateView(UpdateAPIView):
    permission_classes = [IsAuthAdmin]
    queryset = USER.objects.all()
    serializer_class = UserImageUpdateSerializer
    lookup_field = 'id'
    
class AdminUserDeleteView(APIView):    
    def delete(self, request, id):
        try:
            user = USER.objects.get(id=id)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except USER.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)