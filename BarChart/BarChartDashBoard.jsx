import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, ReferenceLine } from 'recharts';  

function BarChartDashBoard({ budgetList }) {
    return (
        <div className='border rounded-lg p-5'>
            <h2 className='font-bold text-lg text-center mb-5'>Budget Activity Overview</h2>
            
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={budgetList}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 20,
                        bottom: 10
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    
                    <ReferenceLine y={0} stroke="#000" strokeWidth={1} />
                    
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ color: '#4845d2' }}
                    />
                    
                    <Legend verticalAlign="top" height={36} iconType="circle" />

                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4f8ef7" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4845d2" stopOpacity={0.5} />
                        </linearGradient>
                    </defs>

                    <Bar
                        dataKey="totalSpend"
                        stackId="a"
                        fill="url(#grad1)"
                        barSize={30} 
                        radius={[5, 5, 0, 0]} 
                        isAnimationActive={true} 
                        animationDuration={1000} 
                    />
                    <Bar
                        dataKey="amount"
                        stackId="a"
                        fill="#C3C2FF"
                        barSize={30}
                        radius={[5, 5, 0, 0]}
                        isAnimationActive={true}
                        animationDuration={1000}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartDashBoard;
