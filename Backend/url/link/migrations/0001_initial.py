# Generated by Django 5.1.1 on 2025-02-13 08:22

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='URL_Shortener',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('long_url', models.URLField()),
                ('short_url', models.CharField(blank=True, max_length=20, unique=True)),
                ('shortening_type', models.CharField(choices=[('random', 'Random Short URL'), ('custom', 'Custom Short URL')], default='random', max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expiry_at', models.DateTimeField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
