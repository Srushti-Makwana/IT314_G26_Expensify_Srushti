"use client"
import React, { useEffect, useState } from "react"
import {UserButton, useUser } from '@clerk/nextjs'
import {db} from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/dbConfig.jsx";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets,Expenses } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/schema.jsx"; 
import CardInfo from "C:/Sushi/Project/expense-tracker1/expense-tracker/app/(routes)/dashboard/_components/CardInfo.jsx";
import BarChartDashBoard from "C:/Sushi/Project/expense-tracker1/expense-tracker/app/(routes)/dashboard/_components/BarChartDashBoard.jsx";
import BudgetItem from "C:/Sushi/Project/expense-tracker1/expense-tracker/app/(routes)/dashboard/budgets/_components/BudgetItem.jsx";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function DashBoard(){
    const {user}=useUser();
    const [budgetList, setbudgetList]=useState([]);
    const[expensesList, setexpensesList]=useState([]);
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
            .orderBy(Budgets.id);

            setbudgetList(result)
            ;
            getAllExpenses();
    }
    const getAllExpenses=async()=>{
        const result=await db.select({
            id:Expenses.id,
            name:Expenses.name,
            amount:Expenses.amount,
            createdAt:Expenses.createdAt
        }).from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id))
        ;
        setexpensesList(result);
    }
    return (
        <div className="p-5">
            <h2 className="font-bold text-3xl">  Hi, {user?.fullName} ✌️
                </h2>
                <p className="text-gray-500"> Here's what happening with your money, Let's Manage your expense.</p>
        <CardInfo budgetList={budgetList}/>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
            <div className="md:col-span-2">
                <BarChartDashBoard
                budgetList={budgetList}/>
            <ExpenseListTable
            expensesList={expensesList}
            refreshData={()=>getBudgetList()}/>
            </div>
            <div className='grid gap-5'>
                <h2 className='font-bold text-lg'>Latest Budget</h2>
                {budgetList.map((budget,index)=>(
                    <BudgetItem budget={budget} key={index}/>
                ))}
            </div>

        </div>
        </div>
    )
}
export default DashBoard