from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from django.urls import path
from core.views import MyObtainTokenPairView, RegisterView, GetUsername

urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('getusername/', GetUsername.as_view(), name='get_username')
]