"""
These are the models.

https://docs.djangoproject.com/en/3.1/topics/db/models/
"""
from django.conf import settings
from django.db import models


class Test(models.Model):
    """
    A test model
    """
    value = models.CharField(max_length=80)


class Organization(models.Model):
    """
    A Organization model
    """
    name = models.CharField(max_length=80, help_text="The name of the organization")


class Activity(models.Model):
    """
    An Activity model
    """
    title = models.CharField(max_length=80)
    date = models.DateTimeField(null=True, blank=True)
    organization_owner = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True)
    user_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)



