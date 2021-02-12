"""
Register models to be available in the admin interface.

https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#modeladmin-objects
"""
from django.contrib import admin
from .models import Organization, Activity, Category


@admin.register(Organization, Activity, Category)
class AuthorAdmin(admin.ModelAdmin):
    pass

