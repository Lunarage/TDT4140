"""
These are the data models, that describe the database structure.

https://docs.djangoproject.com/en/3.1/topics/db/models/
"""
from django.conf import settings
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError


class Organization(models.Model):
    """
    Organizations are entities that can organize activities with sign up.
    Members of an organization can create activities on behalf of the organization.
    """
    name = models.CharField(max_length=80, help_text="The name of the organization")
    description = models.TextField(
        default="",
        help_text="Further description of the organization"
    )
    external_link = models.URLField(
        max_length=200,
        default="",
        help_text="Link to organization home page or similar"
    )
    user_member = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        help_text="List of users that are members of organization"
    )

    def __str__(self):
        return self.name


class Category(models.Model):
    """
    Categories are collections of activities that share similarities.
    Categories are pre-defined by moderators/administrators.
    """
    name = models.CharField(max_length=80, help_text="Category name")

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Equipment(models.Model):
    """
    Equipment needed to perform an activity.
    """
    name = models.CharField(max_length=80)

    def __str__(self):
        return self.name


class Activity(models.Model):
    """
    A description of an activity.
    An activity must be owned by a user and can be owned by an organization.
    If owned by an organization, it is considered a event, and can accept sign ups.
    An activity can fall into one or more categories, and can have one or more.
    """
    title = models.CharField(max_length=80, help_text="Activity title")
    date = models.DateTimeField(null=True, blank=True, help_text="Start time of the event")
    description = models.TextField(blank=True, default="In depth description")
    location = models.CharField(max_length=80, default="Location")  # TODO: Implement map?
    activity_image = models.ImageField(null=True, blank=True, upload_to="images/")
    max_participants = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        null=True,
        blank=True,
        help_text="For organization organized events. Maximum number of sign ups"
    )
    activity_level = models.IntegerField(
        default=1,
        validators=[MaxValueValidator(5), MinValueValidator(1)],
        help_text="Indication of effort/difficulty level"
    )
    organization_owner = models.ForeignKey(
        Organization,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="What organization, if any, owns the activity"
    )
    user_owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        help_text="Owner/creator of the event"
    )
    categories = models.ManyToManyField(Category, blank=True, help_text="What categories the activity falls into")
    equipment_used = models.ManyToManyField(Equipment, blank=True, help_text="List of required equipment")
    tagged = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="tags",
        help_text="What users have tagged (like/favourite) the activity.",
        blank=True
    )
    signed_up = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="signed_up",
        help_text="List of users signed up for the activity",
        blank=True,
    )

    class Meta:
        verbose_name = "Activity"
        verbose_name_plural = "Activities"

    def __str__(self):
        return self.title

    def clean_fields(self, exclude=None):
        if self.organization_owner is not None and self.user_owner not in self.organization_owner.user_member.all():
            raise ValidationError({"user_owner": ["User owner does not match the orgaization"]})

    def is_organized(self):
        if self.organization_owner:
            return True
        else:
            return False

    def is_full(self):
      if (self.max_participants):
        return self.signed_up.all().count() >= self.max_participants
      return False


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):  # pylint: disable=unused-argument
    """
    Creates a log-in token for created users.
    This token is used to authenticate users when doing requests to the REST API.
    """
    if created:
        Token.objects.create(user=instance)
