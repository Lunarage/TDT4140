"""
DOCSTRING HERE!
"""

from gjorno.models import Organization, Activity, Equipment, Category
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import OrganizationSerializer, ActivitySerializer, UserSerializer, EquipmentSerializer, CategorySerializer
from django_filters import rest_framework as filters


class OrganizationFilter(filters.FilterSet):

    class Meta:
        model = Organization
        fields = {
            'name': ['icontains'],
            'description': ['icontains']
        }

class ActivityFilter(filters.FilterSet):

    class Meta:
        model = Activity
        fields = {
            'title': ['icontains'],
            #'organization_owner': ['icontains'],
            #'user_owner': ['icontains'],
            'description': ['icontains'],
            'location': ['icontains'],
            'categories': ['icontains'],
            'activity_level': ['icontains'],
            'equipment_used': ['icontains'],
            'max_participants': ['icontains'],
            'date': ['iexact', 'lte', 'gte']
        }

class UserFilter(filters.FilterSet):

    class Meta:
        model = User
        fields = {
            'first_name': ['icontains'],
            'last_name': ['icontains'],
            'username': ['icontains'],
            'email': ['icontains']
        }

class CategoryFilter(filters.FilterSet):

    class Meta:
        model = Category
        fields = {
            'name': ['icontains'],
        }

class EquipmentFilter(filters.FilterSet):

    class Meta:
        model = Equipment
        fields = {
            'name': ['icontains'],
        }

class OrganizationViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Org model.
    """
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    filterset_class = OrganizationFilter


class ActivityViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Activity model.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filterset_class = ActivityFilter

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for User model.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_class = UserFilter

class EquipmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Equipment model.
    """
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    filterset_class = EquipmentFilter

class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Category model.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_class = CategoryFilter