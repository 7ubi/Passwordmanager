from django.db import models


# Create your models here.
class Password(models.Model):
    website = models.CharField(max_length=100)
    title = models.CharField(max_length=50, default=website)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=75)
