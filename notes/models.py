from django.db import models
from django.shortcuts import reverse
from django.db.models.signals import pre_save
from django.utils.text import slugify

# Create your models here.

class Notes(models.Model):
    ques = models.CharField(max_length=500)
    ans = models.TextField()
    # create_date = models.DateTimeField()
    # updated_date = models.DateTimeField(blank=True, null=True)
    category = models.CharField(max_length=20)
    link = models.URLField(blank=True, null=True)
    doc = models.FileField(upload_to="", blank=True, null=True)

    def get_absolute_url(self):
        return reverse('home')

    def __str__(self):
        return str(self.ques)
