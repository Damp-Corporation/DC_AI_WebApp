from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedbackViewSet, UserViewSet, LoginAPIView

router = DefaultRouter()
router.register(r'feedback', FeedbackViewSet)
router.register(r'users', UserViewSet)
router.register(r'login', LoginAPIView)

urlpatterns = [
    path('', include(router.urls)),
]