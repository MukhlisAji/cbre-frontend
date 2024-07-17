import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MapLayout() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col h-full overflow-hidden'>
        <Header />
        <div className='p-4 h-full overflow-hidden'>{<Outlet />}</div>
      </div>
    </div>
  )
}
