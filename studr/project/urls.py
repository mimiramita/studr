from django.urls import path
from django.urls import path
from .views import CreateProject, AnswerQuestion, GetProjects

urlpatterns = [
    path("createproject/", CreateProject.as_view(), name="create_project"),
    path("answerquestion/", AnswerQuestion.as_view(), name="answer_question"),
    path("getprojects/", GetProjects.as_view(), name="get_projects" )
]
