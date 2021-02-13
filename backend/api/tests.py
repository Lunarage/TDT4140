"""
Tests for the REST API.
Should check that the API responds correctly according to the documentation.
"""
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from gjorno.models import Activity


class APITestCase(TestCase):
    """
    A test for the API.
    """

    def setUp(self):
        test_user = User(username="test")
        test_user.save()
        test_activity = Activity(
            title="Tur i skogen",
            date="2021-02-28T14:30Z",
            user_owner=test_user
        )
        test_activity.save()

    def test_get_activities(self):
        client = APIClient()
        response = client.get('/api/activity/', HTTP_ACCEPT='application/json')
        assert response.status_code == 200
        for activity in response.json():
            assert "title" in activity
            assert "date" in activity
            assert "organization_owner" in activity
            assert "user_owner" in activity
