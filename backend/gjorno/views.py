"""
Our views go here

https://docs.djangoproject.com/en/3.1/intro/tutorial03/
"""
from django.shortcuts import render


def index(request):
    """
    Renders the index template.

    :param request [TODO:type]: [TODO:description]
    """
    return render(request, "gjorno/index.html")
