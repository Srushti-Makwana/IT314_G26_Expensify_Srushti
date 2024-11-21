import { Trash } from 'lucide-react';
import React from 'react';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

function ExpenseListTable({ expensesList = [], refreshData }) {
  const deleteExpense = async (expense) => {
    try {
      const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        toast.success('Expense Deleted Successfully!');
        refreshData(); // Refresh the data after deletion
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mt-3 bg-gradient-to-b from-black via-gray-800 to-gray-950 p-3 rounded-md">
      <div className="grid grid-cols-5 bg-gray-800 p-2 rounded-t-md border-none">
        <h2 className="font-bold text-white">Name</h2>
        <h2 className="font-bold text-white">Amount</h2>
        <h2 className="font-bold text-white">Date</h2>
        <h2 className="font-bold text-white">Mode of Payment</h2> {/* New header */}
        <h2 className="font-bold text-white">Action</h2>
      </div>
      {expensesList && expensesList.length > 0 ? (
        expensesList.map((expense) => (
          <div key={expense.id} className="grid grid-cols-5 bg-gray-700 p-2 border-none hover:bg-gray-600 transition-colors">
            <h2 className="text-white">{expense.name}</h2>
            <h2 className="text-white">{formatAmount(expense.amount)}</h2>
            <h2 className="text-white">{formatDate(expense.createdAt)}</h2>
            <h2 className="text-white">{expense.payment_method || 'Unknown'}</h2> {/* Display Mode of Payment */}
            <h2>
              <Trash
                className="text-red-600 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => deleteExpense(expense)}
              />
            </h2>
          </div>
        ))
      ) : (
        <div className="col-span-5 text-center p-4 bg-gray-700 text-white">No expenses found.</div>
      )}
    </div>
  );
}

export default ExpenseListTable;
