# Generated by Django 4.2.1 on 2023-08-06 20:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("project_id", models.AutoField(primary_key=True, serialize=False)),
                ("project_name", models.CharField(max_length=50, null=True)),
                ("created_on", models.DateTimeField(auto_now_add=True, null=True)),
                ("video_link", models.CharField(max_length=1000, null=True)),
                ("text", models.TextField(null=True)),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.account"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Folder",
            fields=[
                ("folder_id", models.AutoField(primary_key=True, serialize=False)),
                ("folder_name", models.CharField(max_length=50, null=True)),
                ("created_on", models.DateTimeField(auto_now_add=True, null=True)),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.account"
                    ),
                ),
                ("projects", models.ManyToManyField(blank=True, to="project.project")),
            ],
        ),
    ]
