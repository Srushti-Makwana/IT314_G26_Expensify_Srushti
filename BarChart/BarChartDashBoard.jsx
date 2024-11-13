import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';  

function BarChartDashBoard({ budgetList }) {
    return (
        <div className='border rounded-lg p-5'>
            <h2 className='font-bold text-lg'> Activity</h2>
            <BarChart
                width={500}
                height={300}
                data={budgetList}
                margin={{
                    top: 7
                }}
            >
                <XAxis dataKey='name'/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey='totalSpend' stackId="a" fill='#4845d2'/>
                <Bar dataKey='amount' stackId="a" fill='#C3C2FF'/>
            </BarChart>
        </div>
    )
}

export default BarChartDashBoard;
