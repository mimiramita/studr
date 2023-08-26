from __future__ import absolute_import
from celery import shared_task
from .utils import speech_recognition
from .models import Project, Folder
from core.models import Account

@shared_task
def create_project(account_id, project_info):
    text = speech_recognition(project_info['link'])
    account = Account.objects.filter(account_id=account_id)[0]
    folder = Folder.objects.filter(folder_name=project_info['folder'])[0]
    new_project = Project.objects.create(project_name=project_info['title'], current_folder=folder, owner=account, video_link=project_info['link'], text=text)
    new_project.save()
    