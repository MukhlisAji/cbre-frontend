import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import DataEntrySidebar from './DataEntrySidebar'

export default function DataEntryLayout() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
        <DataEntrySidebar/>
        <div className='flex-1'>
          <Header/>
            <div className='p-4'>{<Outlet/>}</div>
        </div>
    </div>  
    )
}
