from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedbackViewSet, UserViewSet

router = DefaultRouter()
router.register(r'feedback', FeedbackViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]