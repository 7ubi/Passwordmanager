from api.models import ManagedPassword
from .config.passwordmanagerConfig import PasswordmanagerConfig


class ManagedPasswordTestCase(PasswordmanagerConfig):

    def test_password_saved(self):
        # When
        managedPassword = ManagedPassword.objects.get(creator=self.user)

        # Then
        self.assertEqual(managedPassword.title, 'title')
        self.assertEqual(managedPassword.managed_password, 'password')
        self.assertEqual(managedPassword.username, 'username')
        self.assertEqual(managedPassword.website, 'website')
