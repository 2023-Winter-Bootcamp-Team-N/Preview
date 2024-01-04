from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(max_length=20, null=False)
    password = models.CharField(max_length=20, null=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    deleted_at = models.DateField(null=True)

class Subscribe(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    subscribe_channel = models.CharField(max_length=100, null=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    deleted_at = models.DateField(null=True)


