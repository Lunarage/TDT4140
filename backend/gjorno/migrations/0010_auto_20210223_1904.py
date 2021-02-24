# Generated by Django 3.1.6 on 2021-02-23 19:04

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gjorno', '0009_delete_test'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='activity_level',
            field=models.IntegerField(default=1, help_text='Indication of effort/difficulty level', validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AlterField(
            model_name='activity',
            name='categories',
            field=models.ManyToManyField(blank=True, help_text='What categories the activity falls into', to='gjorno.Category'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='date',
            field=models.DateTimeField(blank=True, help_text='Start time of the event', null=True),
        ),
        migrations.AlterField(
            model_name='activity',
            name='description',
            field=models.TextField(blank=True, default='In depth description'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='equipment_used',
            field=models.ManyToManyField(blank=True, help_text='List of required equipment', to='gjorno.Equipment'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='location',
            field=models.CharField(default='Location', max_length=80),
        ),
        migrations.AlterField(
            model_name='activity',
            name='max_participants',
            field=models.IntegerField(blank=True, default=None, help_text='For organization organized events. Maximum number of sign ups', null=True),
        ),
        migrations.AlterField(
            model_name='activity',
            name='organization_owner',
            field=models.ForeignKey(blank=True, help_text='What organization, if any, owns the activity', null=True, on_delete=django.db.models.deletion.SET_NULL, to='gjorno.organization'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='tagged',
            field=models.ManyToManyField(help_text='What users have tagged (like/favourite) the activity.', related_name='tags', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='activity',
            name='title',
            field=models.CharField(help_text='Activity title', max_length=80),
        ),
        migrations.AlterField(
            model_name='activity',
            name='user_owner',
            field=models.ForeignKey(help_text='Owner/creator of the event', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(help_text='Category name', max_length=80),
        ),
        migrations.AlterField(
            model_name='organization',
            name='description',
            field=models.TextField(default='', help_text='Further description of the organization'),
        ),
        migrations.AlterField(
            model_name='organization',
            name='external_link',
            field=models.URLField(default='', help_text='Link to organization home page or similar'),
        ),
        migrations.AlterField(
            model_name='organization',
            name='user_member',
            field=models.ManyToManyField(help_text='List of users that are members of organization', to=settings.AUTH_USER_MODEL),
        ),
    ]