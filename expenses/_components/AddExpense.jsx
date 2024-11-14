"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { db } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/dbConfig.jsx";
import { Budgets, Expenses } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/schema.jsx";

function AddExpense({ budgetId, user, refreshData }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const addNewExpense = async () => {
        if (!name || !amount) {
            toast.error("Please fill all fields!");
            return;
        }

        try {
            const result = await db
                .insert(Expenses)
                .values({
                    name: name.trim(),
                    amount: parseFloat(amount),
                    budgetId: budgetId,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt:moment().format('DD/MM/YY')
                })
                .returning({ insertedId: Expenses.id });
                setAmount('')
                setName('')
            console.log("Insert Result:", result);

            if (result.length > 0) {
                refreshData();
                toast.success("New Expense Added!");
                setName("");
                setAmount("");
            } else {
                toast.error("Failed to add expense. Please try again.");
            }
        } catch (error) {
            console.error("Error inserting expense:", error);
            toast.error("Failed to add expense. Please try again.");
        }
    };

    return (
        <div className="border p-5 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
            <h2 className="font-bold text-lg mb-4 text-center text-gray-800">
                <span role="img" aria-label="expense">💸</span> Add Expense
            </h2>
            <div className="space-y-4">
                <div>
                    <h2 className="text-gray-700 font-medium mb-1 text-left">Expense Name</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Bedroom Decor"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <h2 className="text-gray-700 font-medium mb-1 text-left">Expense Amount</h2>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. Rs 100000"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    disabled={!(name && amount)}
                    onClick={addNewExpense}
                    className={`w-full p-3 rounded-md text-white font-semibold transition-all ${
                        name && amount
                            ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:scale-105 shadow-lg"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    Add New Expense
                </button>
            </div>
        </div>
    );
}

export default AddExpense;
