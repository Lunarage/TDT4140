"""
DOCSTRING HERE!
"""

from gjorno.models import Organization, Activity
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import OrganizationSerializer, ActivitySerializer, UserSerializer


class OrganizationViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Org model.
    """
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class ActivityViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Activity model.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for User model.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer