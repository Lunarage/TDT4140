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
        test_organization = Organization(name="TestOrg")
        test_user2.save()
        test_user1.save()
        test_organization.save()
        test_activity = Activity(
            title="Tur i skogen",
            date="2021-02-28T14:30Z",
            user_owner=test_user1,
            organization_owner=test_organization
        )
        test_activity2 = Activity(
            title="Basketball",
            date="2021-03-28T14:30Z",
            user_owner=test_user2,
            organization_owner=test_organization
        )
        test_activity3 = Activity(
            title="Ekstrembasketball",
            date="2021-03-28T14:30Z",
            user_owner=test_user2,
            organization_owner=test_organization
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

    def test_filter_activity(self):
        client = APIClient()
        response = client.get('/api/activity/?search=basketball', HTTP_ACCEPT='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
        for activity in response.json():
            self.assertTrue("basketball" in activity["title"].lower())


class APISignupCase(TestCase):
    """
    A test for the sign up function of the API.
    """

    def setUp(self):
        test_user = User(username="test")
        test_user.save()
        test_organization = Organization(name="TestOrg")
        test_organization.save()
        # Non-organized activity
        test_activity = Activity(
            title="Tur i skogen",
            user_owner=test_user,
        )
        # Organized activity
        test_activity2 = Activity(
            title="Basketball",
            max_participants=1,
            user_owner=test_user,
            organization_owner=test_organization
        )
        # Full organized activity
        test_activity3 = Activity(
            title="Ekstrembasketball",
            max_participants=0,
            user_owner=test_user,
            organization_owner=test_organization
        )
        test_activity.save()
        test_activity2.save()
        test_activity3.save()

    def test_non_authorized_user(self):
        """
        Try to sign up for an activity without being logged in.
        We expect to receive forbidden 401 because we don't provide any credentials.
        """
        client = APIClient()
        response = client.put("/api/activity/2/signup/", HTTP_ACCEPT="application/json")
        self.assertTrue(response.status_code == status.HTTP_401_UNAUTHORIZED)

    def test_signup_non_organized(self):
        """
        Try to sign up for an activity that is not organized.
        We expect to receive bad request 400.
        """
        user = User.objects.get(username="test")
        token = Token.objects.get(user__username=user.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

        response = client.put("/api/activity/1/signup/", HTTP_ACCEPT="application/json")
        self.assertTrue(response.status_code == status.HTTP_400_BAD_REQUEST)

    def test_signup_put_and_delete(self):
        """
        Sign up for avtivity
        and check that the sign up list of the activity contains the user.
        Then withdraw from the activity
        and check that the user is no longer in the list.
        """
        user = User.objects.get(username="test")
        token = Token.objects.get(user__username=user.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

        response = client.put("/api/activity/2/signup/", HTTP_ACCEPT="application/json")
        self.assertTrue(response.status_code == status.HTTP_204_NO_CONTENT)

        activity = Activity.objects.get(pk=2)
        self.assertTrue(user in activity.signed_up.all())

        response = client.delete("/api/activity/2/signup/", HTTP_ACCEPT="application/json")
        self.assertTrue(response.status_code == status.HTTP_204_NO_CONTENT)
        self.assertTrue(user not in activity.signed_up.all())

    def test_activity_full(self):
        """
        Attempt to sign up for a full activity.
        """
        user = User.objects.get(username="test")
        token = Token.objects.get(user__username=user.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

        response = client.put("/api/activity/3/signup/", HTTP_ACCEPT="application/json")
        self.assertTrue(response.status_code == status.HTTP_400_BAD_REQUEST)


class APIStarCase(TestCase):
    """
    A test for the star function of the API.
    """

    def setUp(self):
        test_user = User(username="test")
        test_user.save()
        test_activity = Activity(
            title="Tur i skogen",
            user_owner=test_user,
        )
        test_activity.save()

    def test_non_authorized_user(self):  # pylint: disable=no-self-use
        """
        Try to star an activity without being logged in.
        We expect to receive forbidden 401 because we don't provide any credentials.
        """
        client = APIClient()
        response = client.put("/api/activity/1/star/", HTTP_ACCEPT="application/json")
        self.assertTrue(response.status_code == status.HTTP_401_UNAUTHORIZED)

    def test_star_put_and_delete(self):
        """
        Star an activity
        and check that the star list of the activity contains the user.
        Then unstar the activity
        and check that the user is no longer on the list.
        """
        user = User.objects.get(username="test")
        token = Token.objects.get(user__username=user.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
        response = client.put("/api/activity/1/star/", HTTP_ACCEPT="application/json")
        self.assertTrue(response.status_code == status.HTTP_204_NO_CONTENT)
        activity = Activity.objects.get(pk=1)
        self.assertTrue(user in activity.tagged.all())
        response = client.delete("/api/activity/1/star/", HTTP_ACCEPT="application/json")
        self.assertTrue(response.status_code == status.HTTP_204_NO_CONTENT)
        self.assertTrue(user not in activity.tagged.all())
