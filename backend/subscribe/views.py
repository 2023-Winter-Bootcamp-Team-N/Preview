from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from .models import Subscribe
from .serializers import SubscribeSerializer, SubscribeCancelSerializer, MessageResponseSerializer

from drf_yasg.utils import swagger_auto_schema
# Create your views here.
class SubscribeAPIView(APIView):
    @swagger_auto_schema(request_body=SubscribeSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        serializer = SubscribeSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data.get('user_id')
            subscribe_channel = serializer.validated_data.get('subscribe_channel')
            if Subscribe.objects.filter(user_id=user_id, subscribe_channel=subscribe_channel).exists():
                return Response({"message": "이미 구독된 채널입니다."}, status=status.HTTP_400_BAD_REQUEST)
                
            serializer.save()
            return Response({"구독되었습니다."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubscribeCancelAPIView(APIView):   
    @swagger_auto_schema(query_serializer=SubscribeCancelSerializer, responses={"200":MessageResponseSerializer})
    def delete(self, request, subscribe_channel):
        user_id = request.query_params.get('user_id', None)
        try:
            subscription = Subscribe.objects.get(user_id=user_id, subscribe_channel=subscribe_channel, deleted_at__isnull=True)
            subscription.deleted_at = timezone.now()
            subscription.save()
            return Response({"message": "구독이 성공적으로 해지되었습니다."}, status=status.HTTP_200_OK)
        except Subscribe.DoesNotExist:
            return Response({"error": "구독 정보를 찾지 못했습니다"}, status=status.HTTP_404_NOT_FOUND)
