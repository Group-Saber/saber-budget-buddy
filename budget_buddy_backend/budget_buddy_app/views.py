from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from budget_buddy_app.serializers import UserSerializer, GroupSerializer
from .models import Budget
from .serializers import BudgetSerializer
import pyrebase

config={
    "apiKey": "AIzaSyA3R68DtVZapYJYO1ZNtnmYvPfs65lMLMk",
    "authDomain": "budgetbuddy-dbcce.firebaseapp.com",
    "databaseURL": "https://budgetbuddy-dbcce-default-rtdb.firebaseio.com",
    "projectId": "budgetbuddy-dbcce",
    "storageBucket": "budgetbuddy-dbcce.appspot.com",
    "messagingSenderId": "731027921205",
    "appId": "1:731027921205:web:97f729e036aa8813afd47c",
    "measurementId": "G-4GKVCSQRN3"
}
firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()

def fire_budgets(request):
    budget = database.child('Budgets').child('budget1').child('amount').get().val() # write to database
    database.child('Budgets').child('budget4').child('amount').set(100) # read from database
    return HttpResponse(budget)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def get_budgets(request):
    budgets = Budget.objects.all()
    serializer = BudgetSerializer(budgets, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def input_budget(request):
    data = request.data
    budget = Budget.objects.create(
        amount=data
    )
    serializer = BudgetSerializer(budget, many=False)
    return Response(serializer.data)

# Create your views here.
def say_hello(request):
    return HttpResponse('Hello World')

def andrew_info(request):
    return HttpResponse('Andrew Arteaga - Back End')

