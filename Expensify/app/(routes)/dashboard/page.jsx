"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "@/app/(routes)/dashboard/_components/CardInfo"; // Updated to use @ alias
import { db } from "@/utils/dbConfig"; // Updated to use @ alias
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema"; // Updated to use @ alias
import BarChartDashboard from "@/app/(routes)/dashboard/_components/BarChartDashboard"; // Updated to use @ alias
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable"; // Updated to use @ alias


export default function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [numOfBudgets, setNumOfBudgets] = useState(0);
  const [latestExpenses, setLatestExpenses] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBudgetList();
      getLatestExpenses(); // Fetch the latest expenses
    }
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

    const totalBudgetAmount = result.reduce(
      (acc, budget) => acc + parseFloat(budget.amount),
      0
    );
    const totalExpenseAmount = result.reduce(
      (acc, budget) => acc + parseFloat(budget.totalSpend || 0),
      0
    );
    const numberOfBudgets = result.length;

    setTotalBudget(totalBudgetAmount);
    setTotalExpense(totalExpenseAmount);
    setNumOfBudgets(numberOfBudgets);
    setBudgetList(result);
  };

  // Function to fetch latest 10 expenses
  const getLatestExpenses = async () => {
    const result = await db
      .select({
        ...Expenses,
        budgetName: Budgets.name, // Assuming 'name' is the column for budget name
      })
      .from(Expenses)
      .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
      .orderBy(Expenses.createdAt, "desc")
      .limit(10); // Fetch the latest 10 expenses
    setLatestExpenses(result);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0b234a] text-white">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}!</h2>
      <p className="text-gray-300">
        Here's what's happening with your money. Let's manage your expenses!
      </p>

      <div className="mt-10">
        <CardInfo
          budgetList={budgetList}
          totalBudget={totalBudget}
          totalSpent={totalExpense}
          numOfBudgets={numOfBudgets}
        />
        <div className="mt-6 flex justify-center items-center">
          <div className="w-full max-w-4xl">
            <BarChartDashboard budgetList={budgetList} />
          </div>
        </div>

        {/* Latest 10 Expenses Table */}
        <div className="mt-6">
          <h3 className="font-bold text-xl text-white mb-4">Latest 10 Expenses</h3>
          <ExpenseListTable expensesList={latestExpenses} refreshData={getLatestExpenses} />
        </div>
      </div>
    </div>
  );
}
