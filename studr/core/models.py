from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=50, null=True)
    owner = models.ForeignKey('Account', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True, null=True)
    video_link = models.CharField(max_length=1000, null=True)

class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account_created = models.DateTimeField()
    projects = models.ManyToManyField('Project', blank=True)