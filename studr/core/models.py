from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _

class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account_created = models.DateTimeField(auto_now_add=True, blank=True)
    projects = models.ManyToManyField('project.Project', blank=True)
    folders = models.ManyToManyField('project.Folder', blank=True)