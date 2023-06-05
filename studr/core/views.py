from django.shortcuts import render
from rest_framework.permissions import AllowAny
# Create your views here.
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User
from rest_framework.views import APIView
from drf_yasg import openapi
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import RegisterSerializer
from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

#Example data.
#access_token_str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY29sZF9zdHVmZiI6IuKYgyIsImV4cCI6MTIzNDU2LCJqdGkiOiJmZDJmOWQ1ZTFhN2M0MmU4OTQ5MzVlMzYyYmNhOGJjYSJ9.NHlztMGER7UADHZJlxNG0WSi22a2KaYSfd1S-AuT7lU'
# @api_view(['GET'])
# @authentication_classes((TokenAuthentication,))
# @permission_classes((IsAuthenticated,))
from rest_framework.decorators import api_view, permission_classes

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
            # account = user.account_set.first()
            # manager_id = account.id
            print(user)
            # user_id_url = request.GET.get('id')
            # access_token_obj = AccessToken(user_id_url)
            # user_id=access_token_obj['user_id']
            # user=User.objects.get(id=user_id)
            # print('user_id: ', user_id )
            # print('user: ', user)
            # print('user.id: ', user.id )
            # content =  {'user_id': user_id, 'user':user, 'user.id':user.id}
            return Response({'status': False, 'message': "No time entries for this user"},
                                    status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status': False, 'message': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer