from rest_framework import permissions

class IsAuthenticatedAndOwner(permissions.BasePermission):

    # @rules.predicate
    # def is_admin(user):
    #     return user.is_staff
    
    # @rules.predicate
    # def is_object_owner(user, object):
    #     return object.user_owner__username == user.username

    # message = "You don't have permission to do this."
    # is_object_editable = is_object_owner | is_admin
    message = "You must be the owner of this activity."
    def has_object_permission(self, request, view, obj):
        if request.method is permissions.SAFE_METHODS:
            return True
        return obj.user_owner == request.user

        # if request.method in permissions.SAFE_METHODS:
        #     #Check permissions for read-only request
        #     return True
        # else:
        #     #Check permissions for write request
        #     return request.user.is_admin()

class PartOfOrganization(permissions.BasePermission):
    message = "User is not part of organization."
    def has_object_permission(self, request, view, obj): #Is not done yet
        print(request.data["user_owner"])
        print(request.data["organization_owner"])
        print(obj.organization_owner)
        if request.method in permissions.SAFE_METHODS:
            return True
        return True
    