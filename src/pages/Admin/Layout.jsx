import Sidebar from 'components/Sidebar';
import Topbar from 'components/Topbar';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(prev => !prev);
  }
  return (
    <div className={`grid duration-200 ${open ? 'grid-cols-[60px_1fr] md:grid-cols-[250px_1fr]' : 'grid-cols-[1fr]'}`}>
      <Sidebar open={open} toggle={toggle} />
      <div className='w-full flex flex-col h-screen bg-[#f6f7f9] overflow-hidden '>
        <Topbar open={open} toggle={toggle} />
        <div className='w-full h-[calc(100%-70px)] p-3 md:px-5 md:py-6' >
         
          <Outlet/>
        </div>
      </div>

    </div>
  )
}

export default Layout
