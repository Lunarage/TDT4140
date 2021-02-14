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
    A Organization model consisting of an attribute "name"
    """
    name = models.CharField(max_length=80, help_text="The name of the organization")
    user_member = models.ManyToManyField(settings.AUTH_USER_MODEL)


class Category(models.Model):
    """
    A Categories model consisting of an attribute "name"
    """
    name = models.CharField(max_length=80)
    
    
class Activity(models.Model):
    """
    An Activity model which consists of a tittle and the date to when the activity is going to happen.
    An activity can be owned by a user or by an organization and can fall into spesific category. 
    """
    title = models.CharField(max_length=80)
    date = models.DateTimeField(null=True, blank=True)
    organization_owner = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True)
    user_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    categories = models.ManyToManyField(Category)
    
    







