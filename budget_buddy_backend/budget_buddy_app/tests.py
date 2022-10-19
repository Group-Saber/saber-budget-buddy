from django.test import TestCase
from .models import Budget
# Create your tests here.

class BudgetTestCase(TestCase):
    def setup(self):
        budget = Budget.objects.create(amount=53)
        
        
    def test_budget_created(self):
         budget = Budget(amount=50)
         self.assertEqual(budget.amount, 50)
          
    def test_income_positive(self):
         income = Budget(inc_amount=20)
         self.assertGreaterEqual(income.inc_amount, 0) #test if income is less than 0
