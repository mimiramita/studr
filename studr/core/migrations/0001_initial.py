# Generated by Django 4.2.1 on 2023-08-06 20:38

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Account",
            fields=[
                ("account_id", models.AutoField(primary_key=True, serialize=False)),
                ("account_created", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
