import budget_buddy_app.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget_buddy_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='amount',
            field=models.FloatField(validators=[budget_buddy_app.validators.validate_positive]),
        ),
    ]