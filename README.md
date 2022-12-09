[![Django CI](https://github.com/7ubi/Passwordmanager/actions/workflows/django.yml/badge.svg)](https://github.com/7ubi/Passwordmanager/actions/workflows/django.yml)
# Password manager
 Web based password manager using Django and React

## Installation

### Python
Install python requirements - [Python](https://www.python.org/downloads/) must be installed on the device
```
pip install -r requirements.txt
```

### NPM
Installing npm requirements - [Node.js](https://nodejs.org/en/download/) must be installed on the device
1. Go in the Frontend directory

```
cd frontend
```

2. Run this command to install requirements

```
npm install
```

### Django
1. Generate a Secret key for Django. Run these commands in a python console
```
from django.core.management.utils import get_random_secret_key  
get_random_secret_key()
```

2. Create a file called .env in the main directory.
In the file write the following:
```
SECRET_KEY='YOUR GENERATED KEY'
```

3. Run all migrations for the database with these commands in the main directory
```
python manage.py makemigrations
python manage.py migrate
```

## Running on local machine

To start the <b>Django</b> server, run this command from the directory of the project
```
python manage.py runserver
```

To start <b>React</b>
1. Go in the <b>frontend</b> directory
```
cd frontend
```
2. Start React with npm
```
npm run dev
```

## Running it on Docker

1. ```docker build --file=frontend.dockerfile -t password-web-frontend .```
2. ```docker build --file=backend.dockerfile -t password-web-backend .```
3. ```docker-compose -f docker-compose.yml up```
4. Check localhost:8000
