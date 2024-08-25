import PageContainer from 'components/PageContainer'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
const Users = () => {


  return (
    <PageContainer>
    <div className='flex items-center justify-between w-full border-b-2 py-2 px-3 flex-wrap'>
          <h1 className='text-4xl font-semibold'>
         Users
          </h1>
         
          <Link to={"add"} className='bg-[--color-primary] py-2 px-3 rounded-md font-medium text-white'>Add Book</Link>
    </div>
  </PageContainer>
  )
}

export default Users
