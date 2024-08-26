import React, { useEffect, useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useLocation } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import GroupIcon from '@mui/icons-material/Group';

const data = [
    {
        title: "Dashboard",
        icon: <DashboardIcon className='w-[24px] h-[24px]' />,
        link: "dashboard",
    },
    {
        title: "Books",
        icon: <LibraryBooksIcon className='w-[24px] h-[24px]' />,
        link: "books",
    },
    {
        title: "Issue Book",
        icon: <AutoStoriesIcon className='w-[24px] h-[24px]' />,
        link: "issue-books",
    },
    {
        title: "Return Books",
        icon: <AutoStoriesIcon className='w-[24px] h-[24px]' />,
        link: "return-books",
    },
    {
        title: "Users",
        icon: <GroupIcon className='w-[24px] h-[24px]' />,
        link: "users",
    },

]

const Sidebar = ({ open, toggle }) => {
    const location = useLocation();
    const [url,setUrl]=useState([]);
   
    useEffect(()=>{
        const urlArray = location.pathname.split("/");
        setUrl(urlArray)
      },[location])






    return (
        <div className={`w-full flex-col z-10 ${open?'flex':'hidden'} `} style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <div className='flex h-[70px] px-3 py-2'>
                <div className='w-full flex gap-1 items-center justify-start'>
                    <span className='font-extrabold h-[40px] w-[40px] flex justify-center items-center rounded-lg text-xl bg-[--color-primary]'>
                        BS
                    </span>
                    {
                        open &&
                        <h1 className='font-bold hidden md:block'>

                            BookStore
                        </h1>
                    }
                </div>
            </div>
            <div className='flex flex-col h-[calc(100%-70px)]  px-3 py-5 gap-2' >
                {
                    data.map((item, index) => {
                        var selected = url.includes(item.link);
                        return (
                            <Link to={item.link} key={index} className={`w-full p-2  gap-2 rounded-md items-center  duration-100 cursor-pointer flex ${!open ? 'justify-center' : ''} ${selected ? 'bg-[--color-primary-off] font-medium' : 'hover:bg-slate-50'} `}>

                                {item.icon}
                                {
                                    open &&
                                    <p className='text-lg hidden md:block'>
                                        {item.title}
                                    </p>
                                }
                            </Link>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Sidebar
