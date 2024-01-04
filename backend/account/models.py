from django.db import models


class Member(models.Model):
    email = models.CharField(max_length=20, null=False)
    password = models.CharField(max_length=20, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)

class Subscribe(models.Model):
    user_id = models.ForeignKey(Member, on_delete=models.CASCADE)
    subscribe_channel = models.CharField(max_length=100, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)


