import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div className='flex bg-neutral-100 h-screen max-w-screen w-full'>
      <div className='z-30'>
        <Sidebar />
      </div>
      <div className='flex flex-col w-full overflow-hidden items-stretch justify-stretch'>
        <Header />
        <div className='w-full h-full overflow-hidden'>{<Outlet />}</div>
      </div>
    </div>
  )
}
