"""
Routes the requests.

https://www.django-rest-framework.org/tutorial/quickstart/#urls
"""
from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'test', views.TestViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
