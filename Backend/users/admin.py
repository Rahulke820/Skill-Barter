from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'full_name', 'phone_number', 'is_active', 'is_staff', 'is_otp_verified')
    search_fields = ('email', 'full_name')

    # Action to verify OTP
    @admin.action(description='Verify selected users OTP')
    def verify_otp_for_users(self, request, queryset):
        updated_count = queryset.update(is_otp_verified=True)
        self.message_user(request, f'{updated_count} users were successfully verified.')

    # Action to make users staff
    @admin.action(description='Make selected users staff')
    def make_staff(self, request, queryset):
        updated_count = queryset.update(is_staff=True)
        self.message_user(request, f'{updated_count} users were successfully made staff members.')

    actions = ['verify_otp_for_users', 'make_staff']