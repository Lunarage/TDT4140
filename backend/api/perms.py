from rest_framework import permissions
from gjorno.models import Organization
from django.contrib.auth.models import User

class IsAuthenticatedAndOwner(permissions.BasePermission):
    message = "You must be the owner of this activity."
    def has_object_permission(self, request, view, obj):
        if request.method is permissions.SAFE_METHODS:
            return True
        return obj.user_owner == request.user

class PartOfOrganization(permissions.BasePermission):
    message = "User is not part of organization."
    def has_object_permission(self, request, view, obj): #Is not done yet
        if request.method in permissions.SAFE_METHODS:
            return True
        return (
            User.objects.get(id=request.data["user_owner"]) in 
            Organization.objects.get(id=request.data["organization_owner"]).user_member.all()
        )
    