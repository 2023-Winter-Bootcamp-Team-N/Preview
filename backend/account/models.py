from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(max_length=20, null=False)
    password = models.CharField(max_length=20, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
