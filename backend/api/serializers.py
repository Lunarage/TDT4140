"""
Serializes the models to json strings

https://www.django-rest-framework.org/tutorial/1-serialization/
"""
from gjorno.models import Organization, Activity, Category, Equipment
from rest_framework import serializers
from django.contrib.auth.models import User


class OrganizationSerializer(serializers.ModelSerializer):
    """
    Serializer for the organization model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = Organization
        fields = ["id", "name", "description", "external_link", "user_member"]


class ActivitySerializer(serializers.ModelSerializer):
    """
    Serializer for the activity model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = Activity
        fields = ["id", "title", "date", "organization_owner", "user_owner", "description", "location", "categories", "activity_level", "equipment_used", "max_participants"]


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the user model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = User
        fields = ["id", "first_name", "last_name", "username", "email"]

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the category model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = Category
        fields = ["id", "name"]

class EquipmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the equipment model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = Equipment
        fields = ["id", "name"]
