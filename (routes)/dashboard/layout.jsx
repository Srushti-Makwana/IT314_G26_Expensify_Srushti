import React from 'react'
import SideNav from './_components/SideNav.jsx'
import DashBoardHeader from './_components/dashBoardHeader.jsx'
function DashboardLayout({ children }) {
    return (
        <div>
            <div className='fixed md:w-64 hidden md:block bg-yellow-100'>
                <SideNav/>
            </div>
            <div className='md:ml-64 bg-green-200'>
                <DashBoardHeader/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout