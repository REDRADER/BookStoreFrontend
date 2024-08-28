import PageContainer from 'components/PageContainer'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import useBackdrop from 'hooks/useBackdrop';
import { PrivateComponent } from 'api/axios';
import EditIcon from '@mui/icons-material/Edit';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
const Users = () => {
  const [search, setSearch] = useState("");

  const { openBackdrop, closeBackdrop, BackdropComponent } = useBackdrop();

  const privateAxios = PrivateComponent();
  const [data, setData] = useState([]);

  const getData = async () => {
    openBackdrop();
    try {
      const res = await privateAxios.get(`/admin/users`)
      const { data } = res;
      setData(data);
    } catch (error) {
      alert("Error Getting Books")
    }

    closeBackdrop();
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <PageContainer>
     <div className='flex items-center justify-between w-full border-b-2 py-3 px-3 flex-wrap gap-3'>
          <h1 className='text-2xl md:text-4xl font-semibold order-1'>
            Users
          </h1>
          <div className='w-full md:w-[200px] lg:min-w-[350px] rounded-lg border flex items-center pl-2 pr-3 gap-1 order-3 md:order-2 '>
            <SearchIcon className='w-[15px] h-[20px]' />
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className='w-full h-[35px] rounded-lg  outline-none border-none bg-none' />

          </div>
          <Link to={"add"} className='bg-[--color-primary] py-2 px-3 rounded-md font-medium text-white order-2 md:order-3'>Add User</Link>
        </div>
        <div className='w-full flex justify-start items-start overflow-auto rounded-lg border-[1px]'>
          <table className='w-full border-collapse min-w-[1000px] rounded-t-lg'>
            <thead className='rounded-t-lg'>
              <tr className='bg-[#f9fafb] border-b-[1px] border-b-[#d2d2d2] text-[14px] font-semibold rounded-t-lg '>
                <th className='px-3 py-2 text-left w-[70px] text-[#313131]'>
                 Sr No.
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Name
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Email
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Phone
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Issued Books
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.filter((item)=>(item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search) || item.phone.toLowerCase().includes(search) )).map((user,index)=>{
                  return(
                    <tr key={index} className={`border-b`}>
                        <td className='px-3 py-2 text-left w-[70px] text-[15px] '>
                          {index+1}
                        </td>
                  
                    <td className='px-3 py-2 text-left '>
                      <div className='flex w-full h-full flex-col'>
                      <h3 className='text-[15px] leading-[18px]'>

                      {user.name}
                      </h3>
                     
                      </div>
                    </td>
                    <td className='px-3 py-2 text-left text-[15px]'>
                      {user.email}
                    </td>
                    <td className='px-3 py-2 text-left text-[15px]'>
                      {user.phone}
                    </td>
                    <td className='px-3 py-2 text-left text-[15px]'>
                      {user?.books?.length}
                    </td>
                    <td className='px-3 py-2 text-left w-[150px] '>
                      <div className='flex gap-2'>
                        <Link to={`edit/${user._id}`} className='w-[28px] h-[28px] flex justify-center items-center'><EditIcon className='h-full w-full' style={{width:"100%",height:"100%"}} /></Link>
                        {/* <Link to={`${user._id}`} className='w-[28px] h-[28px] flex justify-center items-center'><FullscreenIcon className='h-full w-full' style={{width:"100%",height:"100%"}} /></Link>
                        <Link to={`/admin/issue-books?bookId=${book._id}`} className='w-[28px] h-[28px] flex justify-center items-center'><BeenhereIcon className='h-full w-full' style={{width:"100%",height:"100%"}} /></Link> */}
                      </div>
                    </td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
  </PageContainer>
  )
}

export default Users
