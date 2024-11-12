import React from "react";
import { ShoppingCart, CheckCircle } from "lucide-react";  

import Link from "next/link";  

function BudgetItem({ budget }) {
    const spendPercentage = budget?.totalSpend 
    ? (budget.totalSpend / budget.amount) * 100 
    : 0;
  

  return (
    <Link 
      href={'/dashboard/expenses/' + budget?.id}  
      className="block p-5 border rounded-lg bg-gradient-to-br from-white to-gray-100 shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 cursor-pointer"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-3 items-center">
          <h2 className="text-2xl p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-full">
            {budget?.icon || <ShoppingCart />}
          </h2>
          <div>
            <h2 className="font-extrabold text-lg">{budget?.name}</h2>
            <h2 className="text-sm text-gray-500 flex items-center gap-1">
              <CheckCircle size={14} className="text-green-500" />
              {budget?.totalItem} Item{budget?.totalItem > 1 && "s"}
            </h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">
          ₹{budget?.amount}
        </h2>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="text-red-500">₹</span>
            {budget?.totalSpend || 0} Spent
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-500">₹</span>
            {budget?.amount - budget?.totalSpend} Remaining
          </div>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600`}
            style={{ width: `${spendPercentage}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
