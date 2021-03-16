"""
DOCSTRING HERE!
"""

from api import perms
from gjorno.models import Organization, Activity, Equipment, Category
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import OrganizationSerializer, ActivitySerializer, UserSerializer, EquipmentSerializer, CategorySerializer
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import permissions
#from django_filters import rest_framework as filters


# class OrganizationFilter(filters.FilterSet):

#     class Meta:
#         model = Organization
#         fields = {
#             'name': ['icontains'],
#             'description': ['icontains']
#         }

# class ActivityFilter(filters.FilterSet):

#     class Meta:
#         model = Activity
#         fields = {
#             'title': ['icontains'],
#             'organization_owner__name': ['icontains'],
#             'user_owner__username': ['icontains'],
#             'description': ['icontains'],
#             'location': ['icontains'],
#             'categories': ['icontains'],
#             'activity_level': ['icontains'],
#             'equipment_used': ['icontains'],
#             'max_participants': ['icontains'],
#             'date': ['iexact', 'lte', 'gte']
#         }

# class UserFilter(filters.FilterSet):

#     class Meta:
#         model = User
#         fields = {
#             'first_name': ['icontains'],
#             'last_name': ['icontains'],
#             'username': ['icontains'],
#             'email': ['icontains']
#         }

# class CategoryFilter(filters.FilterSet):

#     class Meta:
#         model = Category
#         fields = {
#             'name': ['icontains'],
#         }

# class EquipmentFilter(filters.FilterSet):

#     class Meta:
#         model = Equipment
#         fields = {
#             'name': ['icontains'],
#         }

class OrganizationViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Org model.
    """
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    #filter_backends = [filters.SearchFilter]
    #search_fields = ['name', 'description']
    #filterset_class = OrganizationFilter

class ActivityViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Activity model.
    """
    permission_classes = [
        perms.AuthenticatedOrReadOnly &
        perms.PartOfOrganization &
        perms.IsAuthenticatedAndOwner
    ]
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
    #Search on different params: ['description', 'user_owner__username', 'organization_owner__name', 'location', 'activity_level', 'equipment_used__name', 'categories__name', 'max_participants']
    #filterset_class = ActivityFilter

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for User model.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['GET'], permission_classes=[permissions.IsAuthenticated],)
    def activity(self, request, *args, **kwargs):
        user = self.get_object()
        activities = Activity.objects.filter(user_owner=user)
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['GET'], permission_classes=[permissions.IsAuthenticated],)
    def organization(self, request, *args, **kwargs):
        user = self.get_object()
        organizations = Organization.objects.filter(user_member__id=user.id)
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)
    #filter_backends = [filters.SearchFilter]
    #search_fields = ['first_name', 'last_name', 'username', 'email']
    #filterset_class = UserFilter

class CurrentUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for the currently logged in user.
    """
    serializer_class = UserSerializer
    def get_queryset(self):
        user = self.request.user.id
        return User.objects.filter(id=user)

class EquipmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Equipment model.
    """
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    #filter_backends = [filters.SearchFilter]
    #search_fields = ['name']
    #filterset_class = EquipmentFilter

class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Category model.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    #filter_backends = [filters.SearchFilter]
    #search_fields = ['name']
    #filterset_class = CategoryFilter
