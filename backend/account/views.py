from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg.utils import swagger_auto_schema
    
class MembersAPIView(APIView):
    @swagger_auto_schema(tags=['회원 가입'], request_body=UserSerializer, responses={"201":MessageResponseSerializer})
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