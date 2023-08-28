from django.contrib import admin
from django.contrib.auth.models import User
from .models import Project, Folder, Question

# Register your models here.
class ProjectAdmin(admin.ModelAdmin):
    readonly_fields = ('project_id')
class FolderAdmin(admin.ModelAdmin):
    readonly_fields = ('folder_id')
class QuestionAdmin(admin.ModelAdmin):
    readonly_fields = ('question_id')

admin.site.register(Project)
admin.site.register(Folder)
admin.site.register(Question)