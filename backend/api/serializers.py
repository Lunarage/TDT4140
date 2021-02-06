"""
Serializes the models to json strings

https://www.django-rest-framework.org/tutorial/1-serialization/
"""
from gjorno.models import Test
from rest_framework import serializers


class TestSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the test model.
    """

    class Meta:  # pylint: disable=too-few-public-methods
        model = Test
        fields = ['value']
