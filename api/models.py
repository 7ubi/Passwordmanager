from django.db import models

from django.contrib.auth.models import User

from django_cryptography.fields import encrypt


# Create your models here.
class ManagedPassword(models.Model):
    id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    website = models.CharField(max_length=100)
    title = models.CharField(max_length=50, default=website)
    username = models.CharField(max_length=50)
    managed_password = encrypt(models.CharField(max_length=75))

    def __str__(self):
        return self.title
