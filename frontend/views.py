from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


# Create your views here.
@login_required(login_url='/authentication')
def indexLoginRequired(request):
    return render(request, 'frontend/index.html')


def indexLogin(request):
    if request.user.is_authenticated:
        return redirect('/')

    return render(request, 'frontend/index.html')
