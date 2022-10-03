from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Assignment 3 Number 3</br></br>Ryan Austin Mangilin - Backend")
