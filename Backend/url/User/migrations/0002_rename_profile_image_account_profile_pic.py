# Generated by Django 5.1.1 on 2025-02-09 15:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='profile_image',
            new_name='profile_pic',
        ),
    ]
