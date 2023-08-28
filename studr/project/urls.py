from django.urls import path
from django.urls import path
from .views import CreateProject, AnswerQuestion, GetProjects, GetFolders, GetRecentProjects, GetQuestions

urlpatterns = [
    path("createproject/", CreateProject.as_view(), name="create_project"),
    path("answerquestion/", AnswerQuestion.as_view(), name="answer_question"),
    path("getprojects/", GetProjects.as_view(), name="get_projects" ),
    path("getfolders/", GetFolders.as_view(), name="get_folders"),
    path("getrecentprojects/", GetRecentProjects.as_view(), name="get_recent_projects"),
    path("getquestions/", GetQuestions.as_view(), name="get_questions")
]
