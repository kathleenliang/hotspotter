from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.views import APIView

from clinic.models import Clinic

# Create your views here.


class ClinicView(APIView):
    def get(self, request):
        clinics = {"Clinics": list(Clinic.objects.all().values())}
        return JsonResponse(clinics)
