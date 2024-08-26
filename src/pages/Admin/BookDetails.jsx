import PageContainer from 'components/PageContainer'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import useBackdrop from 'hooks/useBackdrop';
import { PrivateComponent } from 'api/axios';
import EditIcon from '@mui/icons-material/Edit';
import BeenhereIcon from '@mui/icons-material/Beenhere';
const BookDetails = () => {
  const [search, setSearch] = useState("");

  const { openBackdrop, closeBackdrop, BackdropComponent } = useBackdrop();

  const privateAxios = PrivateComponent();
  const [data, setData] = useState([]);

  const getData = async () => {
    openBackdrop();
    try {
      const res = await privateAxios.get(`/books`)
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
    <>
      <BackdropComponent />
      <PageContainer>
        <div className='flex items-center justify-between w-full border-b-2 py-3 px-3 flex-wrap min-w-[600px]'>
          <h1 className='text-4xl font-semibold'>
            Books
          </h1>
          <div className='w-[200px] lg:min-w-[350px] rounded-lg border flex items-center pl-2 pr-3 gap-1 '>
            <SearchIcon className='w-[15px] h-[20px]' />
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className='w-full h-[35px] rounded-lg  outline-none border-none bg-none' />

          </div>
          <Link to={`/admin/book/${"dsad"}`} className='bg-[--color-primary] py-2 px-3 rounded-md font-medium text-white'>Edit</Link>
        </div>
        <div className='w-full flex justify-start items-start overflow-auto rounded-lg border-[1px]'>
       
        </div>


      </PageContainer>

    </>
  )
}

export default BookDetails
