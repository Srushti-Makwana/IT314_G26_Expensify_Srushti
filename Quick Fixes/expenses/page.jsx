"use client";

import React, { useEffect, useState } from "react";
import {db} from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/dbConfig.jsx";
import { Budgets,Expenses } from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/schema.jsx"
import { eq, desc, like } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function ExpensesPage() {
    const { user } = useUser();
    const [expensesList, setExpensesList] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("");
    const [budgets, setBudgets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (user) {
            fetchExpenses();
            fetchBudgets();
        }
    }, [user]);

    const fetchExpenses = async () => {
        const result = await db
            .select({
                id: Expenses.id,
                name: Expenses.name,
                amount: Expenses.amount,
                createdAt: Expenses.createdAt,
                budgetName: Budgets.name,
            })
            .from(Expenses)
            .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            

        setExpensesList(result);
        setFilteredExpenses(result);
    };

    const fetchBudgets = async () => {
        const result = await db
            .select({ id: Budgets.id, name: Budgets.name })
            .from(Budgets)
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

        setBudgets(result);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = expensesList.filter((expense) =>
            expense.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredExpenses(filtered);
    };

    const handleFilter = (e) => {
        setSelectedBudget(e.target.value);
        if (e.target.value) {
            const filtered = expensesList.filter((expense) => expense.budgetName === e.target.value);
            setFilteredExpenses(filtered);
        } else {
            setFilteredExpenses(expensesList);
        }
    };

    const handleDelete = async (id) => {
        await db.delete(Expenses).where(eq(Expenses.id, id));
        toast.success("Expense deleted!");
        fetchExpenses();
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const paginatedExpenses = filteredExpenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
            
            {/* Search and Filter */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-1/3 p-2 border rounded-lg"
                />
                <select
                    value={selectedBudget}
                    onChange={handleFilter}
                    className="p-2 border rounded-lg"
                >
                    <option value="">All Budgets</option>
                    {budgets.map((budget) => (
                        <option key={budget.id} value={budget.name}>
                            {budget.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Expenses Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                Amount
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                Budget
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedExpenses.length > 0 ? (
                            paginatedExpenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {expense.name}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        ₹{expense.amount}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {expense.budgetName || "Uncategorized"}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button
                                            className="text-red-500 hover:text-red-700 mr-3"
                                            onClick={() => handleDelete(expense.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-gray-500">
                                    No expenses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(filteredExpenses.length / itemsPerPage)).keys()].map((num) => (
                    <button
                        key={num}
                        className={`mx-1 px-3 py-1 rounded ${num + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handlePageChange(num + 1)}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ExpensesPage;
