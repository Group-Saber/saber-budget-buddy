from django.test import TestCase
from .models import Budget

# Create your tests here.
class BudgetTestCase(TestCase):
    def setup(self):
        budget = Budget.objects.create(amount=53)

    def test_budget_created(self):
        budget = Budget(amount=53)
        self.assertEqual(budget.amount, 53)