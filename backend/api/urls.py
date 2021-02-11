"""
Routes the requests.

https://www.django-rest-framework.org/tutorial/quickstart/#urls
"""
from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'activity', views.ActivityViewSet)
router.register(r'organization', views.OrganizationViewSet)
router.register(r'user', views.UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
