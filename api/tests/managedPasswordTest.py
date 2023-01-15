from django.test import TestCase
from django.contrib.auth.models import User
from api.models import ManagedPassword


class ManagedPasswordTestCase(TestCase):
    def setUp(self):
        # Given
        self.user = User.objects.create_user('max', 'max@mustermann.com', 'maxmustermann')

        # Given
        ManagedPassword.objects.create(
            creator=self.user,
            title='title',
            managed_password='passwordmanager',
            username='username',
            website='website'
        )

    def test_password_saved(self):
        # When
        managedPassword = ManagedPassword.objects.get(creator=self.user)

        # Then
        self.assertEqual(managedPassword.title, 'title')
        self.assertEqual(managedPassword.managed_password, 'passwordmanager')
        self.assertEqual(managedPassword.username, 'username')
        self.assertEqual(managedPassword.website, 'website')
