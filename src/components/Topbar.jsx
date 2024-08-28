import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Backdrop } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { setLogout } from 'state/AppState';
const Topbar = ({ open, toggle }) => {
  const [dropOpen, setDropOpen] = useState(false);
  const { auth } = useAuth();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [url, setUrl] = useState([]);
  const toggleDropDown = () => {
    setDropOpen(prev => !prev)
  }


  const handleLogout=()=>{
    dispatch(setLogout());
    navigate("/login",{replace:true})
  }




  return (
    <div className='h-[70px] flex items-center justify-between bg-white py-4 px-5 ' >
        <span className='h-[30px] w-[30px] flex justify-center items-center'>

        <MenuIcon className='cursor-pointer block md:hidden' style={{width:"100%",height:"100%"}} onClick={toggle} />
        </span>
        
      

      <div className='flex gap-3'>
        <div className='relative'>

          <div className='flex gap-1 cursor-pointer' onClick={toggleDropDown}>
            {auth.name}
            <KeyboardArrowDownIcon />
          </div>
          {
            dropOpen &&
            <>
              <Backdrop sx={{ background: "transparent" }} open={dropOpen} onClick={toggleDropDown} className='w-full z-20' />
              <div className='absolute top-[40px] right-0 min-w-full w-[140px]  bg-white rounded-md py-2 px-2 flex flex-col gap-2 z-30  ' style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <Link to={"profile"} className='w-full py-1 px-2 rounded-[5px]'>
                  Profile
                </Link>
                <p onClick={handleLogout} className='w-full py-1 px-2 rounded-[5px] bg-[#e63946] text-white'>
                  Logout
                </p>
              </div>
            </>
          }


        </div>
      </div>
    </div>
  )
}

export default Topbar
