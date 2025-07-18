from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    fullname = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True)
    email = models.EmailField(blank=True, null=True)

class Feedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    patient_id = models.CharField(max_length=50)
    patient_age = models.IntegerField()
    wait_time_min = models.IntegerField()
    resolution_time_min = models.IntegerField()
    patient_gender = models.CharField(max_length=10)
    date_of_submission = models.DateField(auto_now_add=True)
    department = models.CharField(max_length=100)
    rating = models.IntegerField()
    feedback_text = models.TextField()
    sentiment = models.CharField(max_length=10)
    theme = models.CharField(max_length=50)
    summary = models.TextField()
    language = models.CharField(max_length=10)
    alert_flag = models.BooleanField(default=False)
