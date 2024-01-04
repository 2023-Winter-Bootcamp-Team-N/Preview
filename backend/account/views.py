from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import viewsets
from rest_framework.generics import get_object_or_404

from .models import Subscribe
from .serializers import SubscribeSerializer
from .models import Member
from .serializers import MemberSerializer

class SubscribesAPIView(APIView):
    def post(self, request):
        serializer = SubscribeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MembersAPIView(APIView):
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
