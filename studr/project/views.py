from rest_framework.views import APIView
from drf_yasg import openapi
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
import json
from core.models import Account
from rest_framework.permissions import IsAuthenticated
from project.tasks import create_project
from project.utils import answer_question
from project.models import Project, Folder
from .serializers import ProjectInfo, ProjectInfoSerializer, FolderInfo, FolderInfoSerializer

# start every time
# celery -A studr worker -l info
# brew services restart redis
# redis-cli shutdown
# cipher.py re.compile(r"^\$*\w+\W")
class CreateProject(APIView):
    permission_classes = [IsAuthenticated,]
    project_title = openapi.Parameter(
        "project_title", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING
    )
    folder = openapi.Parameter("folder", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
    link = openapi.Parameter("link", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
    @swagger_auto_schema(
        manual_parameters=[project_title, folder, link],
    )
    def post(self, request):
        try:
            user = request.user
            account = Account.objects.filter(user=user)[0]
            project_info = json.loads(request.body.decode("utf-8"))
            create_project.delay(account.account_id, project_info)
        
            return Response(
                {"status": True, "message": "success"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            print(e)
            return Response(
                {"status": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
        
# unauthorize might be the format of get check again
# modify both
class AnswerQuestion(APIView):
    permission_classes = [IsAuthenticated,]
    project_name = openapi.Parameter(
        "project_name", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING
    )
    question = openapi.Parameter(
        "question", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING
    )
    @swagger_auto_schema(
        manual_parameters=[project_name, question]
    )
    def get(self, request):
        try:
            user = request.user
            account = Account.objects.filter(user=user)[0]
            active_project = Project.objects.filter(owner=account, project_name=request.query_params["project_name"])[0]
            context = active_project.text
            answer = answer_question(context, request.query_params["question"])
            return Response({'status': 'success', 'response': answer}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"status": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
        
class GetProjects(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request):
        try:
            user = request.user
            account = Account.objects.filter(user=user)[0]
            projects = Project.objects.filter(owner=account)
            projects_info = [ProjectInfo(project.project_id, project.project_name, project.owner.account_id, project.created_on, project.video_link, project.text) for project in projects]
            serialized_projects = [ProjectInfoSerializer(project).data for project in projects_info]
            return Response({'status': 'success', 'response': serialized_projects}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"status": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
        
class GetRecentProjects(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request):
        try:
            user = request.user
            account = Account.objects.filter(user=user)[0]
            projects = Project.objects.filter(owner=account).order_by("-created_on")
            projects_info = [ProjectInfo(project.project_id, project.project_name, project.owner.account_id, project.created_on, project.video_link, project.text) for project in projects]
            serialized_projects = [ProjectInfoSerializer(project).data for project in projects_info]
            return Response({'status': 'success', 'response': serialized_projects}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"status": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
        
class GetFolders(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request):
        try:
            user = request.user
            account = Account.objects.filter(user=user)[0]
            folders = Folder.objects.filter(owner=account)

            folders_info = []
            for folder in folders:
                projects = Project.objects.filter(current_folder=folder)
                projects_info = [ProjectInfo(project.project_id, project.project_name, project.owner.account_id, project.created_on, project.video_link, project.text) for project in projects]
                serialized_projects = [ProjectInfoSerializer(project).data for project in projects_info]
                folder_info = FolderInfo(folder_id=folder.folder_id, folder_name=folder.folder_name, account_id=folder.owner.account_id, created_on=folder.created_on, projects=serialized_projects)
                folders_info.append(folder_info)
            
            serialized_folders_info = [FolderInfoSerializer(folder_info).data for folder_info in folders_info]

            return Response({'status': 'success', 'response': serialized_folders_info}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"status": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )


# try returning list and other variables