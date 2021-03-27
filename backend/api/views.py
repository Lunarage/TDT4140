"""
DOCSTRING HERE!
"""

from api import perms
from gjorno.models import Organization, Activity, Equipment, Category
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import (
    OrganizationSerializer,
    ActivitySerializer,
    UserSerializer,
    EquipmentSerializer,
    CategorySerializer,
)
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter


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
            'organization_owner__name': ['icontains'],
            'user_owner__username': ['icontains'],
            'description': ['icontains'],
            'location': ['icontains'],
            'categories__name': ['icontains'],
            'activity_level': ['icontains'],
            'equipment_used__name': ['icontains'],
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
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']
    filterset_class = OrganizationFilter


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
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'description', 'user_owner__username', 'organization_owner__name', 'location', 'activity_level', 'equipment_used__name', 'categories__name', 'max_participants']
    filterset_class = ActivityFilter

    @action(
        methods=['put', 'delete'],
        detail=True,
        permission_classes=[permissions.IsAuthenticated],
    )
    def signup(self, request, *args, **kwargs):  # pylint: disable=unused-argument
        """
        Signs up or withdraws the authorized user for/from the specified activity.
        """
        user = request.user
        activity = self.get_object()
        if activity.is_organized():
            if request.method == 'PUT':
                if not activity.is_full():
                    activity.signed_up.add(user)
                    return Response(status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            elif request.method == 'DELETE':
                activity.signed_up.remove(user)
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                # This should never be run
                return Response(status=status.HTTP_418_IM_A_TEAPOT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=['put', 'delete'],
        detail=True,
        permission_classes=[permissions.IsAuthenticated],
    )
    def star(self, request, *args, **kwargs):  # pylint: disable=unused-argument
        """
        Stars or unstars the activity for the authorized user.
        """
        user = request.user
        activity = self.get_object()
        if request.method == 'PUT':
            activity.tagged.add(user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        if request.method == 'DELETE':
            activity.tagged.remove(user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        # This should never be run
        return Response(status=status.HTTP_418_IM_A_TEAPOT)
    
    @action(
        methods=['GET'],
        detail=False,
        permission_classes=[permissions.IsAuthenticated],
    )
    def organization(self, request, *args, **kwargs):
        """
        Get all activities with an organization_owner
        """
        activities = Activity.objects.filter(organization_owner__id__isnull=False)
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
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
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['first_name', 'last_name', 'username', 'email']
    filterset_class = UserFilter

    @action(
        methods=['get'],
        detail=True,
        permission_classes=[permissions.IsAuthenticated],
    )
    def starred(self, request, *args, **kwargs):  # pylint: disable=unused-argument
        """
        Retreives a list of starred activities for the specified user.
        """
        user = self.get_object()
        activities = Activity.objects.filter(tagged__id=user.id)
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data)
    
    @action(
        methods=['get'],
        detail=True,
        permission_classes=[permissions.IsAuthenticated],
    )
    def signup(self, request, *args, **kwargs):  # pylint: disable=unused-argument
        """
        Retreives a list of every activity that a specific user is signed up to.
        """
        user = self.get_object()
        activities = Activity.objects.filter(signed_up__id=user.id)
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data)


class CurrentUserViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for the currently logged in user.
    """
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user.id
        return User.objects.filter(id=user)


class EquipmentViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Equipment model.
    """
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['name']
    filterset_class = EquipmentFilter


class CategoryViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Category model.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['name']
    filterset_class = CategoryFilter
