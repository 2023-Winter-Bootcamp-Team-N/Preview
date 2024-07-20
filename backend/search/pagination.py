from rest_framework.pagination import CursorPagination
from rest_framework.response import Response
from rest_framework import status

class ScrollPagination(CursorPagination):
    page_size = 2
    ordering = '-created_at'
    cursor_query_param = 'cursor'

    def get_paginated_response(self, data):
        if self.get_previous_link() is None:
            return Response(
                {
                    "meta": {"code": 301, "message": "OK"},
                    "data": {
                        "next": self.get_next_link(),
                        "previous": self.get_previous_link(),
                        "products": data,
                    },
                },
                status=status.HTTP_301_MOVED_PERMANENTLY,
            )
        else:
            return Response(
                {
                    "meta": {"code": 200, "message": "OK"},
                    "data": {
                        "next": self.get_next_link(),
                        "previous": self.get_previous_link(),
                        "products": data,
                    },
                },
                status=status.HTTP_200_OK,
            )