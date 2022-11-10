from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('hello/', views.say_hello),
    path('salary/input/<str:uid>', views.input_salary),
    path('user/<str:uid>', views.get_user),
    path('debts/input/<str:uid>', views.input_debt),
    path('debts/delete/<str:uid>', views.delete_debt),
    path('paid/input/<str:uid>', views.input_paid),
    path('paid/delete/<str:uid>', views.delete_paid),
    path('paid/unpaid/<str:uid>', views.unpaid),
    path('login/', views.login),
    path('signup/', views.signup),
    path('verify/', views.verify),
]