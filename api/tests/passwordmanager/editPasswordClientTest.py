from django.core.cache import cache
from api.models import ManagedPassword
from .config.passwordmanagerConfig import PasswordmanagerConfig


class CreatePasswordClientTestCase(PasswordmanagerConfig):
    def test_edit_password(self):
        cache.clear()

        # Given
        managedPassword = ManagedPassword.objects.get(title='title', creator=self.user)

        # Given
        self.client.login(username='max', password='maxmustermann')

        # Given
        newManagedPassword = {
            'id': managedPassword.id,
            'title': 'title2',
            'username': 'username2',
            'managed_password': 'password2',
            'website': 'website2'
        }

        # When
        response = self.client.post('/api/editPassword/', newManagedPassword)

        # Then
        self.assertEqual(response.status_code, 200)

        # Given
        managedPassword = ManagedPassword.objects.get(id=managedPassword.id)

        # Then
        self.assertEqual(managedPassword.title, newManagedPassword['title'])
        self.assertEqual(managedPassword.username, newManagedPassword['username'])
        self.assertEqual(managedPassword.managed_password, newManagedPassword['managed_password'])
        self.assertEqual(managedPassword.website, newManagedPassword['website'])

    def test_edit_password_wrong_id(self):
        cache.clear()

        # Given
        managedPassword = ManagedPassword.objects.get(title='title', creator=self.user)

        # Given
        self.client.login(username='max', password='maxmustermann')

        # Given
        newManagedPassword = {
            'id': managedPassword.id + 1,
            'title': 'title2',
            'username': 'username2',
            'managed_password': 'password2',
            'website': 'website2'
        }

        # When
        response = self.client.post('/api/editPassword/', newManagedPassword)

        # Then
        self.assertEqual(response.status_code, 404)
