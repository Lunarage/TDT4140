from rest_framework import permissions
from gjorno.models import Organization
from django.contrib.auth.models import User

class IsAuthenticatedAndOwner(permissions.BasePermission):
    message = "You must be the owner of this activity."

    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return bool(request.method in permissions.SAFE_METHODS or obj.user_owner == request.user)


class PartOfOrganization(permissions.BasePermission):
    message = "User is not part of organization."

    def has_permission(self, request, view):
        if "organization_owner" in request.data and request.data["organization_owner"]:
            return (
                request.user in
                Organization.objects.get(id=request.data["organization_owner"]).user_member.all()
            )
        else:
            return True

    def has_object_permission(self, request, view, obj):
        if obj.organization_owner and not (request.method in permissions.SAFE_METHODS):
            return (
                request.user in
                Organization.objects.get(id=obj.organization_owner.id).user_member.all()
            )
        else:
            return True

class AuthenticatedOrReadOnly(permissions.BasePermission):
    message = "You must be authenticated to perform this very cool action!"

    def has_permission(self, request, viewset):
        if request.user.is_authenticated:
            return True
        elif viewset.action == "retrieve" or viewset.action == "list":
            return True
        else:
            return False

    def has_object_permission(self, request, viewset, obj):
        if request.user.is_authenticated:
            return True
        elif viewset.action == "retrieve" or viewset.action == "list":
            return True
        else:
            return False
