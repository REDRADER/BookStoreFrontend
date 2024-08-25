import React from 'react'

const PageContainer = ({children}) => {
  return (
    <div className='w-full h-full bg-white rounded-xl p-4 flex flex-col gap-3'>
        {children}
    </div>
  )
}

export default PageContainer
