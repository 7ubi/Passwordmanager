from api.models import ManagedPassword
from django.core.cache import cache
from .config.passwordmanagerConfig import PasswordmanagerConfig


class DeletePasswordClientTestCase(PasswordmanagerConfig):
    def test_delete_password(self):
        cache.clear()

        # Given
        lengthBefore = len(ManagedPassword.objects.filter(creator=self.user))

        # When
        self.client.login(username='max', password='maxmustermann')
        passwordId = {
            'id': ManagedPassword.objects.get(creator=self.user).id
        }
        response = self.client.post('/api/deletePassword/', passwordId)

        # Then
        self.assertEqual(response.status_code, 200)

        # Then
        lengthAfter = len(ManagedPassword.objects.filter(creator=self.user))
        self.assertEqual(lengthBefore - 1, lengthAfter)

    def test_not_delete_password(self):
        cache.clear()

        # Given
        lengthBefore = len(ManagedPassword.objects.filter(creator=self.user))

        # When
        self.client.login(username='max', password='maxmustermann')
        passwordId = {
            'id': ManagedPassword.objects.get(creator=self.user).id + 1
        }
        response = self.client.post('/api/deletePassword/', passwordId)

        # Then
        self.assertEqual(response.status_code, 404)

        # Then
        lengthAfter = len(ManagedPassword.objects.filter(creator=self.user))
        self.assertEqual(lengthBefore, lengthAfter)
