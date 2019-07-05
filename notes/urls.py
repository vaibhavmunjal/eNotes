from django.urls import path

from .views import (home,
                    create_note,
                    delete_note,
                    ques_exist,
					load_today_notes)

urlpatterns = [
    path('', home, name='home'),
    path('create', create_note, name='create'),
    path('delete', delete_note, name='delete'),
    path('new_notes', load_today_notes, name='new_notes'),
    path('ques_exist', ques_exist, name='ques_exist'),
]
