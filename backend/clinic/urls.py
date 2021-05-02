from django.urls import path
from clinic import views

urlpatterns = [
    path('clinics/', views.ClinicView.as_view(), name="clinics"),
]
