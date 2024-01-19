from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg.utils import swagger_auto_schema

from .models import User
from .serializers import UserSerializer, MessageResponseSerializer
    
class MembersAPIView(APIView):
    @swagger_auto_schema(operation_summary="회원가입", request_body=UserSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            if User.objects.filter(email=email).exists():
                return Response({"이미 존재하는 회원입니다."}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({"회원가입이 완료되었습니다."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    @swagger_auto_schema(operation_summary="로그인", request_body=UserSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            if User.objects.filter(email=email, password=password).exists():
                user = User.objects.get(email=email)
                user_id = user.id
                return Response({'user_id': user_id, 'message': '로그인 되었습니다.'}, status=status.HTTP_200_OK)
            return Response({'message': '아이디 또는 비밀번호가 잘못되었습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
