# Generated by Django 3.1.6 on 2021-02-14 20:36

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gjorno', '0005_auto_20210214_2021'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='user_member',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
