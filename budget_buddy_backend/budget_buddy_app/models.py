from django.db import models
from .validators import validate_positive

# Create your models here.

class Budget(models.Model):
    amount = models.FloatField(validators=[validate_positive])
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(round(self.amount, 2))