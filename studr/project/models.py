from django.db import models
from django.utils.translation import gettext_lazy as _

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=50, null=True)
    current_folder = models.ForeignKey('project.Folder', on_delete=models.CASCADE, null=True)
    owner = models.ForeignKey('core.Account', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True, null=True)
    video_link = models.CharField(max_length=1000, null=True)
    text = models.TextField(null=True)

class Folder(models.Model):
    folder_id = models.AutoField(primary_key=True)
    folder_name = models.CharField(max_length=50, null=True)
    owner = models.ForeignKey('core.Account', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True, null=True)

# class Question(models.Model):
#     question_id = models.AutoField(primar)