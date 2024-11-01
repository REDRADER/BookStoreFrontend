import PageContainer from 'components/PageContainer'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
const ReturnBook = () => {
  return (
    <PageContainer>
     <div className='flex items-center justify-between w-full border-b-2 py-3 px-3 flex-wrap min-w-[600px]'>
          <h1 className='text-2xl md:text-4xl font-semibold'>
          Return Book
          </h1>
         
          <Link to={"add"} className='bg-[--color-primary] py-2 px-3 rounded-md font-medium text-white'>Add Book</Link>
    </div>
  </PageContainer>
  )
}

export default ReturnBook
