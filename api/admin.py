from django.contrib import admin
from .models import Feedback
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'fullname', 'email', 'phone', 'role', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('fullname', 'phone', 'address', 'role')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('fullname', 'phone', 'address', 'role')}),
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(Feedback)
