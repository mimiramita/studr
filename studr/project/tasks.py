from __future__ import absolute_import
from celery import shared_task
from .utils import speech_recognition
from .models import Project

@shared_task
def create_project(account, project_info):
    # text = speech_recognition(project_info['link'])
    # new_project = Project.objects.create(project_name=project_info['title'], owner=account, video_link=project_info['link'], text=text)
    # new_project.save()
    print('this is a test')