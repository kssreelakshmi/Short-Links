from .serializers import *
from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework.response import Response

class URLShortenerView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self,request):
        serializer = URLShortenerSerializer(data=request.data) 
        if serializer.is_valid():
            url_instance = serializer.save(user=request.user)
            return Response(URLShortenerSerializer(url_instance).data, status=201)
        return Response(serializer.errors, status=400)
    
