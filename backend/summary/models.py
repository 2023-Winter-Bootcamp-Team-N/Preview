from django.db import models
from account.models import User

class Summary(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    youtube_title = models.CharField(max_length=100, null=False)
    youtube_channel = models.CharField(max_length=100, null=False)
    youtube_url = models.CharField(max_length=500, null=False)
    youtube_thumbnail = models.CharField(max_length=500, null=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)

class Summary_By_Time(models.Model):
    summary_id = models.ForeignKey(Summary, on_delete=models.CASCADE)
    start_time = models.TimeField(auto_now_add=False)
    end_time = models.TimeField(auto_now=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)

class Category(models.Model):
    summary_id = models.ForeignKey(Summary, on_delete=models.CASCADE)
    category = models.CharField(max_length=20, null=False)