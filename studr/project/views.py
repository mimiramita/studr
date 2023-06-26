from rest_framework.views import APIView
from drf_yasg import openapi
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
import json
from project.models import Project
from core.models import Account
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import get_authorization_header
from .utils import speech_recognition

# Create your views here.
class CreateProject(APIView):
    permission_classes = [IsAuthenticated,]
    project_title = openapi.Parameter(
        "project_title", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING
    )
    link = openapi.Parameter("link", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
    @swagger_auto_schema(
        manual_parameters=[project_title, link],
    )
    def post(self, request):
        try:
            user = request.user
            account = Account.objects.filter(user=user)[0]
            project_info = json.loads(request.body.decode("utf-8"))
            text = speech_recognition(project_info['link'])
            new_project = Project.objects.create(project_name=project_info['title'], owner=account, video_link=project_info['link'])
            new_project.save()
            return Response(
                {"status": True, "message": "success"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"status": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
