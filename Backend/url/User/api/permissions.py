from rest_framework.permissions import BasePermission

class IsAuthAdmin(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superadmin