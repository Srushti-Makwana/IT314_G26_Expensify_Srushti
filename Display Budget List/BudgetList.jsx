"use client"
import React, { use, useEffect, useState } from "react"
import CreateBudget from './CreateBudget'
import { db } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/dbConfig.jsx";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/schema.jsx";
import Budget from "../page";
import { User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { index } from "drizzle-orm/mysql-core";
import BudgetItem from "C:/Sushi/Project/expense-tracker1/expense-tracker/app/(routes)/dashboard/budgets/_components/BudgetItem.jsx";

function BudgetList() {
    const [budgetList, setbudgetList]=useState([]);
    const { user } = useUser();
    useEffect(() => {
        user && getBudgetList();
    }, [user])
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
            .groupBy(Budgets.id);
            setbudgetList(result);

        // setbudgetList(result);
    }
    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2
             lg:grid-cols-3 gap-5">
                <CreateBudget />
                {budgetList.map((budget,index)=>(
                <BudgetItem budget={budget}/>
            ))}
            </div>
        </div>
    )
}
export default BudgetList
