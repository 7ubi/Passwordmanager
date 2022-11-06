from django.urls import path
from api.views.login_views import *
from api.views.password_views import *

urlpatterns = [
    # Password views
    path('password/', PasswordView.as_view()),
    path('passwordUser', GetManagedPasswordUser.as_view()),
    path('createPassword', CreatePasswordView.as_view()),

    # User views
    path('checkUsername/', UsernameExistsView),
    path('createUser/', CreateUserView.as_view()),
    path('loginUser', LoginUserView),
    path('loginUser/', LoginUserView),
    path('logout/', logoutView),
]