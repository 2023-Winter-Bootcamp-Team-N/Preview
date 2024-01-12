"""
ASGI config for nTeamProject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

import account.routing
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nTeamProject.settings')

django.setup()
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        # Just HTTP for now. (We can add other protocols later.)
        # 지금은 HTTP 프로토콜로 설정했지만, 후에 socket통신을 할 예정이므로 다른 프로토콜을 추가할 것이다.
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(account.routing.websocket_urlpatterns))
        ),
    }
)