# Generated by Django 3.1.6 on 2021-03-10 13:56

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gjorno', '0011_auto_20210225_1142'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='signed_up',
            field=models.ManyToManyField(blank=True, help_text='List of users signed up for the activity', related_name='signed_up', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='activity',
            name='tagged',
            field=models.ManyToManyField(blank=True, help_text='What users have tagged (like/favourite) the activity.', related_name='tags', to=settings.AUTH_USER_MODEL),
        ),
    ]
