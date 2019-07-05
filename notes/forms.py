from django import forms

from .models import Notes

class Notes_Form(forms.ModelForm):
    class Meta:
        model = Notes
        fields = ('ques', 'ans', 'doc', 'category', 'link')
