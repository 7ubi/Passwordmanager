from django.core.cache import cache
from api.models import ManagedPassword
from .config.passwordmanagerConfig import PasswordmanagerConfig


class CreatePasswordClientTestCase(PasswordmanagerConfig):
    def test_create_password_user(self):
        cache.clear()
        # Given
        self.client.login(username='max', password='maxmustermann')

        # Given
        newManagedPassword = {
            'title': 'title2',
            'username': 'username2',
            'managed_password': 'password2',
            'website': 'website2'
        }

        # When
        response = self.client.post('/api/createPassword/', newManagedPassword)

        # Then
        self.assertEqual(response.status_code, 201)

        # Given
        managedPassword = ManagedPassword.objects.get(title='title2', creator=self.user)

        # Then
        self.assertEqual(managedPassword.title, newManagedPassword['title'])
        self.assertEqual(managedPassword.username, newManagedPassword['username'])
        self.assertEqual(managedPassword.managed_password, newManagedPassword['managed_password'])
        self.assertEqual(managedPassword.website, newManagedPassword['website'])
