# Generated by Django 4.2.1 on 2023-06-18 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='text',
            field=models.TextField(null=True),
        ),
    ]
