"""
Serializes the models to json strings

https://www.django-rest-framework.org/tutorial/1-serialization/
"""
from gjorno.models import Organization, Activity
from rest_framework import serializers
from django.contrib.auth.models import User


class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the organization model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = Organization
        fields = ["name"]


class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the activity model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = Activity
        fields = ["title", "date", "organization_owner", "user_owner"]


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the user model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = User
        fields = ["name"]
