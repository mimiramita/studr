from django.contrib import admin
from .models import Account

# Register your models here.
class AccountAdmin(admin.ModelAdmin):
    readonly_fields = ('account_id')

admin.site.register(Account)

