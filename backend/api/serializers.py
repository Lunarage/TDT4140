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
    user_member = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:  # pylint: disable=too-few-public-methods
        model = Organization
        fields = ["id", "name", "description", "external_link", "user_member"]


class ActivitySerializer(serializers.ModelSerializer):
    """
    Serializer for the activity model.
    """
    user_owner = serializers.ReadOnlyField(source='user_owner.username')
    organization_owner = serializers.ReadOnlyField(source='organization_owner.name')
    equipment_used = serializers.StringRelatedField(many=True, read_only=True)
    categories = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:  # pylint: disable=too-few-public-methods
        model = Activity
        fields = ["id", "title", "date", "organization_owner", "user_owner", "description", "location", "categories", "activity_level", "equipment_used", "max_participants"]


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the user model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = User
        fields = ["id", "first_name", "last_name", "username", "password", "email"]

        def create(self,validated_data):
            user = User.objects.create_user(username="username", email="email", password="password")
            return user

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
