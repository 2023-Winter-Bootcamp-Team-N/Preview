from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=10)

class Subscribe(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    subcribe_channel = models.CharField(max_length=100, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)

