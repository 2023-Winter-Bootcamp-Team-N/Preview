from .settings import *

SECRET_KEY = 'django-insecure-*nvotl@#j(=e_iu3ldzoiie&o3ut=@ngl_97h4p&1(6qm_4dvc'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': '127.0.0.1',
        'PORT': 5432,
    }
}