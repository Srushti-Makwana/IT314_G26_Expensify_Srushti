"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from './CreateBudget';
import { db } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/dbConfig.jsx";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/schema.jsx";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "C:/Sushi/Project/expense-tracker1/expense-tracker/app/(routes)/dashboard/budgets/_components/BudgetItem.jsx";

function BudgetList() {
    const [budgetList, setBudgetList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getBudgetList();
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
            .orderBy(desc(Budgets.id));
        setBudgetList(result);
    };

    return (
        <div className="mt-7">
            <h1 className="text-3xl font-bold text-center mb-5">Your Budgets</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <CreateBudget refreshData={() => getBudgetList()} />
                
                {budgetList?.length > 0 ? (
                    budgetList.map((budget, index) => (
                        <BudgetItem budget={budget} key={index} />
                    ))
                ) : (
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg-slate-200 rounded-lg h-44 animate-pulse flex items-center justify-center"
                        >
                            <span className="text-slate-400">Loading...</span>
                        </div>
                    ))
                )}
            </div>
            {budgetList?.length === 0 && (
                <div className="text-center text-gray-500 mt-5">
                    <p>No budgets created yet. Start by creating a new budget!</p>
                </div>
            )}
        </div>
    );
}

export default BudgetList;
