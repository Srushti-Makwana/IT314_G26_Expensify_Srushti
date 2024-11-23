import React,{useState} from "react"
import { db } from "../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../utils/schema";
import { toast } from "sonner";

function AddExpense({budgetId,user,refreshData}){
    
    const [name,setName]=useState("");
    const [amount,setAmount]=useState("");
    
    const addNewExpense = async()=>{
        const result= await db.insert(Expenses).values({
            name:name,
            amount : amount,
            budgetId:budgetId,
            createdBy: user?.primaryEmailAddress?.emailAddress
        }).returning({insertedId:Budgets.id });

        console.log(result);
        if(result){
            refreshData()
            toast("New Expense Added!")
        }
    }

    return (
        <div className="border p-5 rounded-lg">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-3 w-full">
                                    <h2 className="text-black font-medium mb-1 text-left">Expense Name</h2>
                                    <input 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Bedroom Decor"
                                        className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mt-3 w-full">
                                    <h2 className="text-black font-medium mb-1 text-left">Expense Amount</h2>
                                    <input 
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="e.g. Rs 100000"
                                        className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                
                                <button
                                disabled={!(name && amount)}
                                onClick={()=>addNewExpense()}
                                        className={`mt-5 w-full p-3 rounded-md transition-colors duration-300 
                                                    ${name && amount ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                                    >
                                        Add New Expense
                                    </button>

        </div>
    )
}
export default AddExpense