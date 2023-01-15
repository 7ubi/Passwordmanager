from django.urls import path
from api.views.authentication import *
from api.views.password_views import *

urlpatterns = [
    # Password views
    path('password/', PasswordView.as_view()),
    path('passwordUser/', GetManagedPasswordUser.as_view()),
    path('createPassword/', CreatePasswordView.as_view()),
    path('generatePassword/', GeneratePasswordView.as_view()),
    path('deletePassword/', DeletePasswordView.as_view()),
    path('editPassword/', EditPasswordView.as_view()),

    # User views
    path('checkUsername', UsernameExistsView),
    path('checkUsername/', UsernameExistsView),
    path('createUser', CreateUserView.as_view()),
    path('loginUser/', LoginUserView),
    path('loginUser', LoginUserView),
    path('logout/', logoutView),
]