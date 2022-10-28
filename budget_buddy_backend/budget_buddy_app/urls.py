from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('hello/', views.say_hello),
    path('budgets/', views.get_budgets),
    path('budget/input/', views.input_budget),
    path('user/<str:uid>', views.get_user),
    path('debts/<str:uid>', views.get_debts),
    path('debts/input/<str:uid>', views.input_debt),
    path('login/', views.login),
    path('signup/', views.signup),
]