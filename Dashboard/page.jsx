"use client"
import React, { useEffect, useState } from "react"
import {UserButton, useUser } from '@clerk/nextjs'
import {db} from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/dbConfig.jsx";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets,Expenses } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/schema.jsx"; 
import CardInfo from "C:/Sushi/Project/expense-tracker1/expense-tracker/app/(routes)/dashboard/_components/CardInfo.jsx";


function DashBoard(){
    const {user}=useUser();
    const [budgetList, setbudgetList]=useState([]);
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
            .groupBy(Budgets.id)
            setbudgetList(result)
            ;
    }
    return (
        <div className="p-5">
            <h2 className="font-bold text-3xl">  Hi, {user?.fullName} ✌️
                </h2>
                <p className="text-gray-500"> Here's what happening with your money, Let's Manage your expense.</p>
        <CardInfo budgetList={budgetList}/>
        </div>
    )
}
export default DashBoard