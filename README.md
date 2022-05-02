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