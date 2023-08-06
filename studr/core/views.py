from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.views import APIView
from drf_yasg import openapi
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from core.models import Account
import json
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.password_validation import validate_password
from django import forms
from rest_framework.permissions import IsAuthenticated


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class getID(APIView):
    user_id = openapi.Parameter('id', in_=openapi.IN_QUERY,
                         type=openapi.TYPE_STRING)
    @swagger_auto_schema(
        manual_parameters=[user_id],
    )
    def get(self, request):
        try:
            if not request.user.is_authenticated:
                return Response({'status': False, 'message': "Not authenticated"},
                                    status=status.HTTP_400_BAD_REQUEST)
            user = request.user
            print(user)
            return Response({'status': False, 'message': "No time entries for this user"},
                                    status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status': False, 'message': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        new_user_info = json.loads(request.body.decode("utf-8"))

        if new_user_info["password"] != new_user_info["password2"]:
            return Response({'status': False, 'message': "Passwords do not match"},
                                    status=status.HTTP_400_BAD_REQUEST)
        
        try:
            validate_password(new_user_info["password"])
        except forms.ValidationError as error:
            return Response({'status': False, 'message': str(error)},
                                    status=status.HTTP_400_BAD_REQUEST)
        
        try:
            validate_email(new_user_info["email"])
        except ValidationError as error:
            return Response({'status': False, 'message': str(error)},
                                    status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=new_user_info["username"],
            email=new_user_info["email"],
            first_name=new_user_info["first_name"],
            last_name=new_user_info["last_name"],
        )

        user.set_password(new_user_info["password"])
        user.save()

        current_user = User.objects.filter(username=new_user_info["username"])[0]
        account = Account.objects.create(
            user=current_user
        )
        account.save()

        return Response({'status': False, 'message': "No time entries for this user"},
                                    status=status.HTTP_200_OK)
    
class GetUsername(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request):
        try:
            user = request.user
            username = user.username
            return Response({'status': 'success', 'response': username}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"status": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )