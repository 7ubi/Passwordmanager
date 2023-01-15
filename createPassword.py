from django.core.management.utils import get_random_secret_key  
key = str(get_random_secret_key())
key = "SECRET_KEY=" + key +"\n"

file = open(".env", "w")
file.writelines(key)
file.close()