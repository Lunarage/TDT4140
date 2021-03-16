"""
Tests for the REST API.
Should check that the API responds correctly according to the documentation.
"""
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from gjorno.models import Activity, Organization


class APITestCase(TestCase):
    """
    A test for the API.
    """

    def setUp(self):
        test_user1 = User(username="test")
        test_user2 = User(username="test2")
        test_organization1 = Organization(name="TestOrg1")
        test_organization2 = Organization(name="TestOrg2")
        test_user1.save()
        test_user2.save()
        test_organization1.save()
        test_organization2.save()
        test_organization1.user_member.add(test_user1)
        test_organization1.user_member.add(test_user2)
        test_organization2.user_member.add(test_user1)
        test_activity = Activity(
            title="Tur i skogen",
            date="2021-02-28T14:30Z",
            user_owner=test_user1,
            organization_owner=test_organization1
        )
        test_activity2 = Activity(
            title="Basketball",
            date="2021-03-28T14:30Z",
            user_owner=test_user1,
            organization_owner=test_organization1
        )
        test_activity3 = Activity(
            title="Ekstrembasketball",
            date="2021-03-28T14:30Z",
            user_owner=test_user2,
            organization_owner=test_organization1
        )
        test_activity.save()
        test_activity2.save()
        test_activity3.save()

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
            #assert "image" in activity
            assert "location" in activity

    def test_get_organizations(self):
        client = APIClient()
        response = client.get('/api/organization/', HTTP_ACCEPT='application/json')
        assert response.status_code == 200
        for organization in response.json():
            assert "id" in organization
            assert "name" in organization
            assert "description" in organization
            #assert "image" in organization
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
    
    def test_get_user_activity(self):
        user = User.objects.get(username="test") # Authorized
        user2 = User.objects.get(username="test2") # Not authorized
        token = Token.objects.get(user__username=user.username)
        client = APIClient()
        client2 = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
        response = client.get('/api/user/1/activity/', HTTP_ACCEPT='application/json')
        response2 = client2.get('/api/user/2/activity/', HTTP_ACCEPT='application/json')
        assert response.status_code == 200
        assert response2.status_code == 401
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
            #assert "image" in activity
            assert "location" in activity
            self.assertTrue("tur i skogen" in activity["title"].lower() or "basketball" in activity["title"].lower())
    
    def test_get_user_organization(self):
        user = User.objects.get(username="test") # Authorized
        user2 = User.objects.get(username="test2") # Not authorized
        token = Token.objects.get(user__username=user.username)
        client = APIClient()
        client2 = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
        response = client.get('/api/user/1/organization/', HTTP_ACCEPT='application/json')
        response2 = client2.get('/api/user/2/organization/', HTTP_ACCEPT='application/json')
        assert response.status_code == 200
        assert response2.status_code == 401
        for organization in response.json():
            assert "id" in organization
            assert "name" in organization
            assert "description" in organization
            #assert "image" in organization
            assert "external_link" in organization
            assert "user_member" in organization
            self.assertTrue("testorg1" in organization["name"].lower() or "testorg2" in organization["name"].lower())

    def test_filter_activity(self):
        client = APIClient()
        response = client.get('/api/activity/?search=basketball', HTTP_ACCEPT='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
        for activity in response.json():
            self.assertTrue("basketball" in activity["title"].lower())
