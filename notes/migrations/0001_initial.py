# Generated by Django 2.2.2 on 2019-07-02 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ques', models.CharField(max_length=500)),
                ('ans', models.TextField()),
                ('category', models.CharField(max_length=20)),
                ('link', models.URLField(blank=True, null=True)),
                ('doc', models.FileField(blank=True, null=True, upload_to='')),
            ],
        ),
    ]
