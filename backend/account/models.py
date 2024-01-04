from django.db import models

class Subscribe(models.Model):
    user_id = models.IntegerField(foreignkey=True)
    subscribe_channel = models.CharField(max_length=100)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now_add=True)
    deleted_at = models.DateField(auto_now_add=True)

