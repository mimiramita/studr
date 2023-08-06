from rest_framework import serializers

class ProjectInfo:
    def __init__(self, project_id, project_name, account_id, created_on, video_link, text):
        self.project_id = project_id
        self.project_name = project_name
        self.account_id = account_id
        self.created_on = created_on
        self.video_link = video_link
        self.text = text
        
class ProjectInfoSerializer(serializers.Serializer):
    project_id = serializers.IntegerField()
    project_name = serializers.CharField()
    account_id = serializers.IntegerField()
    created_on = serializers.DateTimeField()
    video_link = serializers.CharField()
    text = serializers.CharField()

class FolderInfo:
    def __init__(self, folder_id, folder_name, account_id, created_on, projects):
        self.folder_id = folder_id
        self.folder_name = folder_name
        self.account_id = account_id
        self.created_on = created_on
        self.projects = projects

class FolderInfoSerializer(serializers.Serializer):
    folder_id = serializers.IntegerField()
    folder_name = serializers.CharField()
    account_id = serializers.IntegerField()
    created_on = serializers.DateTimeField()
    projects = serializers.PrimaryKeyRelatedField(many=True, read_only=True)