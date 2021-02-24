"""
These are the models.

https://docs.djangoproject.com/en/3.1/topics/db/models/
"""
from django.conf import settings
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Organization(models.Model):
    """
    A Organization model consisting of an attribute "name"
    """
    name = models.CharField(max_length=80, help_text="The name of the organization")
    description = models.TextField(default="")
    external_link = models.URLField(max_length=200, default="")
    user_member = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.name


class Category(models.Model):
    """
    A Categories model consisting of an attribute "name"
    """
    name = models.CharField(max_length=80)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Equipment(models.Model):
    """
    A Equipment model consisting of an attribute "name"
    """
    name = models.CharField(max_length=80)
    
    def __str__(self):
        return self.name

    
class Activity(models.Model):
    """
    An Activity model which consists of a tittle and the date to when the activity is going to happen.
    An activity can be owned by a user or by an organization and can fall into spesific category. 
    """
    title = models.CharField(max_length=80)
    date = models.DateTimeField(null=True, blank=True)
    description = models.TextField(blank=True, default="")
    location = models.CharField(max_length=80, default="")
    max_participants = models.IntegerField(default=None, null=True, blank=True)
    activity_level = models.IntegerField(default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])
    organization_owner = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True)
    user_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    categories = models.ManyToManyField(Category, blank=True)
    equipment_used = models.ManyToManyField(Equipment, blank=True)
    tagged = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="tags")

    class Meta:
        verbose_name = "Activity"
        verbose_name_plural = "Activities"
    
    def __str__(self):
        return self.title
    






@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):  # pylint: disable=unused-argument
    """
    Creates a log-in token for created users.
    This token is used to authenticate users when doing requests to the REST api.
    """
    if created:
        Token.objects.create(user=instance)
