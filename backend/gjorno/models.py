"""
These are the models.

https://docs.djangoproject.com/en/3.1/topics/db/models/
"""
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


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


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):  # pylint: disable=unused-argument
    """
    Creates a log-in token for created users.
    This token is used to authenticate users when doing requests to the REST api.
    """
    if created:
        Token.objects.create(user=instance)
