from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # 👈 This is the main API path
    path('api/chatbot/', include('chatbot.urls')),
]