# pull the official base image
FROM python:3.9.16-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip 
COPY ./requirements.txt /app
RUN pip install -r requirements.txt

# copy project
COPY . /app

RUN python createPassword.py
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN echo "The password is "
RUN cat /app/.env

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]