from django.contrib import admin
from django.urls import path, include, re_path
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from budget_buddy_app import views
from django.views.generic import TemplateView


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('groups', views.GroupViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('budget_buddy_app.urls')),
    path('rest/', include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
    path('accounts/', include('allauth.urls')),
    # path('auth/', TemplateView.as_view(template_name="index.html")),
    path('', TemplateView.as_view(template_name='build/index.html')),
    re_path(r'.*', TemplateView.as_view(template_name='build/index.html'))
]

