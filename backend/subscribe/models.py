from django.db import models
from account.models import User
# Create your models here.

class Subscribe(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    subscribe_channel_id = models.CharField(max_length=100, null=False)
    subscribe_channel_name = models.CharField(max_length=100, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)