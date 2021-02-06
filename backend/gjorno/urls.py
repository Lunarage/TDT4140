"""
Routes requests based on url

https://docs.djangoproject.com/en/3.1/topics/http/urls/
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index')
]
