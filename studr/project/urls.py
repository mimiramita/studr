from django.urls import path
from django.urls import path
from .views import CreateProject

urlpatterns = [
    path("createproject/", CreateProject.as_view(), name="create_project"),
]
