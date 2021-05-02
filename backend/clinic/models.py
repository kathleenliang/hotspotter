from django.db import models
from clinic.enums import Source, Status

# Create your models here.


class Clinic(models.Model):
    name = models.CharField(max_length=20, default="")
    address = models.CharField(max_length=30, default="")
    min_age = models.IntegerField()
    postal_codes = models.TextField(default="")
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    phone = models.CharField(max_length=12, default="", blank=True)
    hours = models.TextField(default="", blank=True)
    submitted_from = models.CharField(max_length=30, choices=Source.choices())
    url = models.CharField(max_length=2000, default="", blank=True)
    status = models.CharField(max_length=8, default=Status.PENDING.value, choices=Status.choices())
