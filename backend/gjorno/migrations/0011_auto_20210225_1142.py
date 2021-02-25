# Generated by Django 3.1.6 on 2021-02-25 11:42

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gjorno', '0010_auto_20210223_1904'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='tagged',
            field=models.ManyToManyField(blank=True, help_text='What users have tagged (like/favourite) the activity.', related_name='tags', to=settings.AUTH_USER_MODEL),
        ),
    ]
