from django.db import models
from .validators import validate_positive
from .validators import validate_negative

# Create your models here.

class Budget(models.Model):
    amount = models.FloatField(validators=[validate_positive])
    inc_amount = models.FloatField(validators=[validate_positive])
    debts_amount = models.FloatField(validators=[validate_negative])
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(round(self.amount, 2))

    def __str__(self):
        return str(round(self.inc_amount, 2))

    def __str__(self):
        return str(round(self.debts_amount, 2))
