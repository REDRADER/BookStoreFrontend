import PageContainer from 'components/PageContainer'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

const Books = () => {
    const [search,setSearch]=useState("");
  return (
    <PageContainer>
      <div className='flex items-center justify-between w-full border-b-2 py-2 px-3 flex-wrap'>
            <h1 className='text-4xl font-semibold'>
                Books
            </h1>
            <div className='min-w-[350px] rounded-lg border flex items-center pl-2 pr-3 gap-1 '>
                <SearchIcon className='w-[15px] h-[20px]'/>
                <input type="text" onChange={(e)=>setSearch(e.target.value)} value={search} className='w-full h-[40px] rounded-lg  outline-none border-none bg-none' />
            
            </div>
            <Link to={"add"} className='bg-[--color-primary] py-2 px-3 rounded-md font-medium text-white'>Add Book</Link>
      </div>
    </PageContainer>
  )
}

export default Books
