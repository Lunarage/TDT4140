"""
These are the models.

https://docs.djangoproject.com/en/3.1/topics/db/models/
"""
from django.db import models


class Test(models.Model):
    """
    A test model
    """
    value = models.CharField(max_length=80)
