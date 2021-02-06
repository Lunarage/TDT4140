"""
DOCSTRING HERE!
"""

from gjorno.models import Test
from rest_framework import viewsets
from .serializers import TestSerializer


class TestViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    API endpoint for Test model.
    """
    queryset = Test.objects.all()
    serializer_class = TestSerializer
