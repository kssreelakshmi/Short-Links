# Generated by Django 5.1.1 on 2025-02-09 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_rename_profile_image_account_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pic/'),
        ),
    ]
