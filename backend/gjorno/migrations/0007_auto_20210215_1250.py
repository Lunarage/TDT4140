# Generated by Django 3.1.6 on 2021-02-15 12:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gjorno', '0006_organization_user_member'),
    ]

    operations = [
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
            ],
        ),
        migrations.AddField(
            model_name='activity',
            name='activity_level',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='activity',
            name='description',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='activity',
            name='location',
            field=models.CharField(default='', max_length=80),
        ),
        migrations.AddField(
            model_name='activity',
            name='max_participants',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='activity',
            name='tagged',
            field=models.ManyToManyField(related_name='tags', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='organization',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='organization',
            name='external_link',
            field=models.URLField(default=''),
        ),
        migrations.AlterField(
            model_name='activity',
            name='categories',
            field=models.ManyToManyField(blank=True, to='gjorno.Category'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='user_owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='activity',
            name='equipment_used',
            field=models.ManyToManyField(blank=True, to='gjorno.Equipment'),
        ),
    ]
