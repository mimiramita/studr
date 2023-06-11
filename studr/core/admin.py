from django.contrib import admin
from django.contrib.auth.models import User
from .models import Account, Project

# Register your models here.
class AccountAdmin(admin.ModelAdmin):
    readonly_fields = ('account_id')
class ProjectAdmin(admin.ModelAdmin):
    readonly_fields = ('project_id')

admin.site.register(Account)
admin.site.register(Project)
