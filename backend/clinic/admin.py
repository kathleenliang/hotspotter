from django.contrib import admin, messages
from django.forms import model_to_dict
from clinic.models import Clinic
from clinic.enums import Status

# Register your models here.


def approve_clinic(self, request, queryset):
    count = 0
    total = 0
    clinic_name = ""
    wrong_status = False
    for clinic in queryset:
        total += 1
        clinic_name = clinic.name
        if clinic.status == Status.PENDING.name:
            count += 1
            setattr(clinic, "status", "APPROVED")
            clinic.save()
        else:
            wrong_status = True
    if count > 1:
        messages.success(
            request, "Successfully approved " + str(count) + " clinics.")
    elif count == 1:
        messages.success(
            request, "Successfully approved " + clinic_name + ".")
    elif wrong_status:
        messages.error(request, "You can only approve of 'Pending' clinics.")
    else:
        msg = "No clinics were selected."
        messages.error(request, msg)


def reject_clinic(self, request, queryset):
    count = 0
    total = 0
    clinic_name = ""
    wrong_status = False
    for clinic in queryset:
        total += 1
        clinic_name = clinic.name
        if clinic.status == Status.PENDING.name:
            count += 1
            clinic.delete()
        else:
            wrong_status = True
    if count > 1:
        messages.success(
            request, "Successfully rejected " + str(count) + " clinics.")
    elif count == 1:
        messages.success(
            request, "Successfully rejected " + clinic_name + ".")
    elif wrong_status:
        messages.error(request, "You can only reject 'Pending' clinics.")
    else:
        msg = "No clinics were selected."
        messages.error(request, msg)


reject_clinic.short_description = "Rejected clinic."


class ClinicAdmin(admin.ModelAdmin):
    list_filter = ('status',)
    list_display = ('name', 'address', 'min_age', 'postal_codes', 'likes', 'dislikes',
                    'phone', 'hours', 'submitted_from', 'url', 'status')

    actions = (approve_clinic, reject_clinic)


admin.site.register(Clinic, ClinicAdmin)
