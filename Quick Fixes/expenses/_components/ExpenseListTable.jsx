import { Trash } from "lucide-react";
import React from "react";
import { db } from "../../../../utils/dbConfig";
import { Expenses } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import moment from "moment"; // Import moment for date formatting

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
        <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Only one Latest Expenses heading */}
            <h2 className="font-semibold text-2xl text-gray-800 mb-4 px-6">Latest Expenses</h2>
            <div className="grid grid-cols-4 gap-6 bg-gray-100 p-4 rounded-t-lg text-gray-700">
                <h2 className="font-semibold text-lg">Name</h2>
                <h2 className="font-semibold text-lg">Amount</h2>
                <h2 className="font-semibold text-lg">Date</h2>
                <h2 className="font-semibold text-lg text-center">Action</h2> {/* Center align Action */}
            </div>

            {expensesList.length > 0 ? (
                expensesList.map((expense) => (
                    <div
                        key={expense.id}
                        className="grid grid-cols-4 gap-6 p-4 border-b hover:bg-gray-50 transition-all duration-300 ease-in-out"
                    >
                        <h2 className="text-gray-800 font-medium">{expense.name}</h2>
                        <h2 className="text-gray-800 font-medium">
                            ₹ {expense.amount.toLocaleString()}
                        </h2>
                        <h2 className="text-gray-500 font-medium">
                            {moment(expense.createdAt).format('DD/MM/YY')}
                        </h2>
                        <h2 className="flex items-center justify-center"> {/* Center align button */}
                            <div
                                onClick={() => deleteExpense(expense)}
                                className="inline-flex items-center justify-center text-white bg-red-600 hover:bg-red-700 p-2 rounded-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                <Trash className="text-white" size={18} />
                            </div>
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
