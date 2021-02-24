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
        #print(User.objects.filter(username=request.data["user_owner"]) in Organization.objects.filter(name=request.data["organization_owner"]))
        #print(User.objects.filter(id=request.data["user_owner"]))
        #print(Organization.objects.filter(name=request.data["organization_owner"]))
        #print(type(request.data["user_owner"]))
        #print(request.data["organization_owner"])
        #print(User.objects.all())
        if request.method in permissions.SAFE_METHODS:
            return True
        return True
    