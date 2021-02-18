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
            assert "id" in activity
            assert "title" in activity
            assert "date" in activity
            assert "organization_owner" in activity
            assert "user_owner" in activity
            assert "activity_level" in activity
            assert "max_participants" in activity
            assert "description" in activity
            assert "categories" in activity
            assert "equipment_used" in activity
            assert "image" in activity
            assert "location" in activity

    def test_get_organizations(self):
        client = APIClient()
        response = client.get('/api/organization/', HTTP_ACCEPT='application/json')
        assert response.status_code == 200
        for organization in response.json():
            assert "id" in organization
            assert "name" in organization
            assert "description" in organization
            assert "image" in organization
            assert "external_link" in organization
            assert "user_member" in organization

    def test_get_user(self):
        client = APIClient()
        response = client.get('/api/user/', HTTP_ACCEPT='application/json')
        assert response.status_code == 200
        for user in response.json():
            assert "id" in user
            assert "first_name" in user
            assert "last_name" in user
            assert "username" in user
            assert "email" in user

    def test_get_category(self):
        client = APIClient()
        response = client.get('/api/category/', HTTP_ACCEPT='application/json')
        assert response.status_code == 200
        for category in response.json():
            assert "id" in category
            assert "title" in category

    def test_get_equipment(self):
        client = APIClient()
        response = client.get('/api/equipment/', HTTP_ACCEPT='application/json')
        assert response.status_code == 200
        for equipment in response.json():
            assert "id" in equipment
            assert "title" in equipment
