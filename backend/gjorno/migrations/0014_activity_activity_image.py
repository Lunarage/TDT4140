# Generated by Django 3.1.6 on 2021-03-14 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gjorno', '0013_auto_20210309_2126'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='activity_image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]