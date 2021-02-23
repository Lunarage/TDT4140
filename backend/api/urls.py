"""
Routes the requests.

https://www.django-rest-framework.org/tutorial/quickstart/#urls
"""
from django.urls import include, path
from rest_framework import routers
from . import views
from .auth_token_view import CustomAuthToken

router = routers.DefaultRouter()
router.register(r'activity', views.ActivityViewSet)
router.register(r'organization', views.OrganizationViewSet)
router.register(r'user', views.UserViewSet)
router.register(r'equipment', views.EquipmentViewSet)
router.register(r'category', views.CategoryViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("token-auth", CustomAuthToken.as_view()),
]
