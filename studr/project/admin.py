from django.contrib import admin
from django.contrib.auth.models import User
from .models import Project

# Register your models here.
class ProjectAdmin(admin.ModelAdmin):
    readonly_fields = ('project_id')

admin.site.register(Project)