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
    user_owner_username = serializers.ReadOnlyField(source='user_owner.username')
    organization_owner_name = serializers.ReadOnlyField(source='organization_owner.name')
    equipment_used_names = serializers.StringRelatedField(source='equipment_used', many=True, read_only=True)
    categories_names = serializers.StringRelatedField(source='categories', many=True, read_only=True)

    class Meta:  # pylint: disable=too-few-public-methods
        model = Activity
        fields = ["id", "title", "date", "organization_owner", "organization_owner_name", "user_owner", "user_owner_username", "description", "location", "categories", "categories_names", "activity_level", "equipment_used", "equipment_used_names", "max_participants"]

    # def create(self, validated_data):
    #     print(validated_data)
    #     activity = Activity(
    #         title = validated_data['title'], 
    #         date = validated_data['date'], 
    #         organization_owner = validated_data['organization_owner'], 
    #         user_owner = validated_data['user_owner'], 
    #         description = validated_data['description'], 
    #         location = validated_data['location'], 
    #         activity_level = validated_data['activity_level'], 
    #         max_participants = validated_data['max_participants']
    #     )
    #     activity.save()
    #     activity.categories.add(Category.objects.filter(id__in=validated_data['categories']))
    #     activity.equipment_used.add(Equipment.objects.filter(id__in=validated_data['equipment_used']))
    #     activity.save()
    #     return activity

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
