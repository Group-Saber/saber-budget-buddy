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

# how to read and write to firebase
# def fire_budgets(request):
#     budget = database.child('Budgets').child('budget').child('amount').get().val() # read from database
#     database.child('Budgets').child('budget').child('amount').set(100) # write to database
#     return HttpResponse(budget)

@api_view(['POST'])
def input_budget(request):
    data = request.data
    database.child('Budgets').child(data['date']).child('amount').set(float(data['amount']))
    return Response(data)

@api_view(['GET'])
def get_budgets(request):
    budgets = database.child('Budgets').get().val()
    budgets = [budgets.get(i) for i in budgets]
    return Response(budgets)

@api_view(['GET'])
def get_debts(request, uid):
    debts = database.child('users').child(uid).child('debts').get().val()
    debts = [debts.get(i) for i in debts]
    return Response(debts)

@api_view(['POST'])
def input_debt(request, uid):
    data = request.data
    database.child('users').child(uid).child('debts').child(data['date']).set(data)
    return Response(data)

@api_view(['GET'])
def get_user(request, uid):
    user = database.child('users').child(uid).get().val()
    return Response({'first': user['first'], 'last': user['last'], 'email': user['email']})

@api_view(['GET'])
def get_name(request, uid):
    first = database.child('users').child(uid).child('first').get().val()
    last = database.child('users').child(uid).child('last').get().val()
    return Response({'first': first, 'last':last})

@api_view(['POST'])
def login(request):
    data = request.data
    email = data['email']
    password = data['password']

    try:
        # if there is no error then signin the user with given email and password
        user = authe.sign_in_with_email_and_password(email,password)
    except:
        message = "Invalid Credentials!!Please ChecK your Data"
        print(message)
        return Response('')
    session_id = user['idToken']
    request.session['uid'] = str(session_id)

    uid = user["localId"]

    return Response(uid)

@api_view(['POST'])
def signup(request):
    data = request.data
    email = data['email']
    password = data['password']
    first_name = data['first']
    last_name = data['last']

    try:
        # creating a user with the given email and password
        user=authe.create_user_with_email_and_password(email,password)
        uid = user['localId']
        store = {'email': email, 'first': first_name, 'last': last_name, 'uid': uid}

        database.child('users').child(uid).set(store)
    except:
        message = "Something went wrong during creation of new user"
        print(message)
        return Response('')

    return Response(uid)

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

# get and input from django builtind database
# @api_view(['GET'])
# def get_budgets(request):
#     budgets = Budget.objects.all()
#     print(budgets)
#     serializer = BudgetSerializer(budgets, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# def input_budget(request):
#     data = request.data
#     budget = Budget.objects.create(
#         amount=data
#     )
#     serializer = BudgetSerializer(budget, many=False)
#     return Response(serializer.data)

# Create your views here.
def say_hello(request):
    return HttpResponse('Hello World')

def andrew_info(request):
    return HttpResponse('Andrew Arteaga - Back End')

