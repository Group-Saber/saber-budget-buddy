from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from budget_buddy_app.serializers import UserSerializer, GroupSerializer
import pyrebase
import math, random
import smtplib


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
#     return Response(budget)

@api_view(['POST'])
def input_salary(request, uid):
    data = request.data
    database.child('users').child(uid).child('salary').set(data)
    return Response(data)

@api_view(['POST'])
def input_expense(request, uid):
    data = request.data
    database.child('users').child(uid).child('expenses').child(data['date']).set(data)
    return Response(data)

@api_view(['POST'])
def input_debt(request, uid):
    data = request.data
    database.child('users').child(uid).child('debts').child(data['date']).set(data)
    return Response(data)

@api_view(['POST'])
def delete_debt(request, uid):
    data = request.data
    database.child('users').child(uid).child('debts').child(data['date']).remove()
    return Response(data)

@api_view(['POST'])
def input_paid(request, uid):
    data = request.data
    database.child('users').child(uid).child('debts').child(data['date']).remove()
    database.child('users').child(uid).child('paid').child(data['paid']).set(data)
    return Response(data)

@api_view(['POST'])
def delete_paid(request, uid):
    data = request.data
    database.child('users').child(uid).child('paid').child(data['paid']).remove()
    return Response(data)

@api_view(['POST'])
def unpaid(request, uid):
    data = request.data
    database.child('users').child(uid).child('paid').child(data['paid']).remove()
    database.child('users').child(uid).child('debts').child(data['date']).set({'amount': data['amount'], 'name': data['name'], 'date': data['date'], 'note': data['note']})
    return Response()

@api_view(['GET'])
def get_user(request, uid):
    user = database.child('users').child(uid).get().val()
    return Response(user)

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
        store = {'email': email, 'first': first_name, 'last': last_name, 'uid': uid, 'salary': 0}

        database.child('users').child(uid).set(store)
    except:
        message = "Something went wrong during creation of new user"
        print(message)
        return Response('')

    return Response(uid)

@api_view(['POST'])
def verify(request):
    data = request.data
    email = data['email']
    password = data['password']

    try:
        # if there is no error then signin the user with given email and password
        user = authe.sign_in_with_email_and_password(email,password)
        
        return Response('taken')
    except Exception as e:
        if e.args[1].find('INVALID_PASSWORD') >= 0:
            return Response('taken')

        code = generateOTP()

        gmail_user = 'saberbudgetbuddy@gmail.com'
        gmail_password = 'libokshxwsmqcane'

        sent_from = gmail_user
        to = email
        subject = 'Budget Buddy Verification Code'
        body = 'Your verification code: ' + code

        email_text = """From: %s\nTo: %s\nSubject: %s\n\n%s
        """ % (sent_from, to, subject, body)

        try:
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            server.ehlo()
            server.login(gmail_user, gmail_password)
            server.sendmail(sent_from, to, email_text)
            server.close()

            print('Email sent!')
        except:
            print('Something went wrong...')
            return Response('sign')

        return Response(code)

def generateOTP() :
    # Declare a string variable 
    # which stores all string
    string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    OTP = ""
    length = len(string)

    for i in range(6) :
        OTP += string[math.floor(random.random() * length)]

    return OTP

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

# Create your views here.
def say_hello(request):
    return HttpResponse('Hello World')
