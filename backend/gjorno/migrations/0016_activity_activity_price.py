# Generated by Django 3.1.6 on 2021-03-23 15:17

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gjorno', '0015_merge_20210318_1231'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='activity_price',
            field=models.IntegerField(blank=True, default=0, help_text='The price of the activity', null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(9999)]),
        ),
    ]