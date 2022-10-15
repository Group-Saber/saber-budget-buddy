from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('hello/', views.say_hello),
    path('andrew/', views.andrew_info),
    path('budgets/', views.get_budgets),
    path('budget/input/', views.input_budget),
]