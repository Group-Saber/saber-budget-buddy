from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def say_hello(request):
    return HttpResponse('Hello World')

def andrew_info(request):
    return HttpResponse('Andrew Arteaga - Back End')