from django.test import TestCase
from .models import Budget

# Create your tests here.
class BudgetTestCase(TestCase):
    def setup(self):
        budget = Budget.objects.create(amount=53)
        income = Budget.objects.create(inc_amount=20)
        debts = Budget.objects.create(debts_amount=-100.00)

    def test_budget_created(self):
        budget = Budget(amount=53)
        self.assertEqual(budget.amount, 53)

    def test_budget_created(self):
        budget = Budget(amount=53)
        self.assertEqual(budget.amount, 53)

    def test_income_positive(self):
        income = Budget(inc_amount=20)
        self.assertGreaterEqual(income.inc_amount, 0) #test if income >= 0

    def test_debts_negative(self):
        debts = Budget(debts_amount=-100.00)
        self.assertLessEqual(debts.debts_amount, 0) #test if debt <= 0, because we want debts to be negative
