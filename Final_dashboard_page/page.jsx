"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../utils/dbConfig";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../utils/schema";
import CardInfo from "./expenses/_components/CardInfo";
import BarChartDashBoard from "./expenses/_components/BarChartDashboard";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import { toast } from "sonner";
import Link from "next/link";

function DashBoard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [threshold, setThreshold] = useState(40); // Threshold set to 40%

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(Budgets.id);

    setBudgetList(result);
    getAllExpenses(); // Fetch all expenses
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress));

    setExpensesList(result);
    analyzeSpending(result); // Analyze spending and show recommendations
  };

  const analyzeSpending = (expenses) => {
    const categorySpend = {}; // Track spending per category

    expenses.forEach((expense) => {
      const category = expense.name; // Replace with expense category if available
      if (!categorySpend[category]) {
        categorySpend[category] = 0;
      }
      categorySpend[category] += expense.amount;
    });

    for (const category in categorySpend) {
      const spending = categorySpend[category];
      if (spending > 10000) { // Warn if spending in a category exceeds 10,000
        toast(`You're spending a lot on ${category}. Consider reducing it to stay within your budget!`);
      }
    }
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌️</h2>
      <p className="text-gray-500">Here's what's happening with your money. Let's manage your expense.</p>

      <CardInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashBoard budgetList={budgetList} />
          <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetList()} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="font-extrabold text-xl text-gray-800 mb-6 text-center uppercase tracking-wide">Latest Budgets</h2>
          <div className="space-y-4">
            {budgetList.map((budget, index) => {
              const remainingMoney = budget.amount - (budget.totalSpend || 0);
              return (
                <Link href={`/dashboard/expenses/${budget.id}`} key={index}>
                  <div className="p-4 border rounded-lg flex justify-between items-center bg-gradient-to-r from-indigo-100 to-indigo-200 hover:from-indigo-200 hover:to-indigo-300 transition-all">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{budget.name}</h3>
                      <p className="text-sm text-gray-600">Total: ₹{budget.amount}</p>
                      <p className="text-sm text-green-700 font-medium">Remaining: ₹{remainingMoney}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-600">Spent: ₹{budget.totalSpend || 0}</p>
                      <p className="text-sm text-gray-500">{budget.totalItem} Items</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
