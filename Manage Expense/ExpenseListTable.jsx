import { Trash } from "lucide-react";
import React from "react";
import { db } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/dbConfig.jsx";
import { Expenses } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/schema.jsx";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            toast("Expense Deleted!");
            refreshData();
        }
    };

    return (
        <div className="mt-5 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-100 text-gray-700 p-4">
                <h2 className="font-semibold text-lg">Name</h2>
                <h2 className="font-semibold text-lg">Amount</h2>
                <h2 className="font-semibold text-lg">Date</h2>
                <h2 className="font-semibold text-lg">Action</h2>
            </div>

            {expensesList.length > 0 ? (
                expensesList.map((expense, index) => (
                    <div
                        key={expense.id}
                        className="grid grid-cols-4 p-4 border-b hover:bg-gray-50 transition-all duration-200"
                    >
                        <h2 className="text-gray-800">{expense.name}</h2>
                        <h2 className="text-gray-800">{expense.amount}</h2>
                        <h2 className="text-gray-500">{new Date(expense.createdAt).toLocaleDateString()}</h2>
                        <h2 className="text-center">
                            <Trash
                                className="text-red-500 hover:text-red-700 cursor-pointer transition duration-200"
                                onClick={() => deleteExpense(expense)}
                            />
                        </h2>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 p-4">No expenses found.</div>
            )}
        </div>
    );
}

export default ExpenseListTable;
