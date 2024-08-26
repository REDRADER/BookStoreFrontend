import PageContainer from 'components/PageContainer'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import useBackdrop from 'hooks/useBackdrop';
import { PrivateComponent } from 'api/axios';
import EditIcon from '@mui/icons-material/Edit';
import BeenhereIcon from '@mui/icons-material/Beenhere';
const Books = () => {
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
        <div className='flex items-center justify-between w-full border-b-2 py-3 px-3 flex-wrap'>
          <h1 className='text-4xl font-semibold'>
            Books
          </h1>
          <div className='min-w-[350px] rounded-lg border flex items-center pl-2 pr-3 gap-1 '>
            <SearchIcon className='w-[15px] h-[20px]' />
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className='w-full h-[35px] rounded-lg  outline-none border-none bg-none' />

          </div>
          <Link to={"add"} className='bg-[--color-primary] py-2 px-3 rounded-md font-medium text-white'>Add Book</Link>
        </div>
        <div className='w-full flex justify-center items-start overflow-auto'>
          <table className='w-full border-collapse min-w-[1000px]'>
            <thead>
              <tr className='bg-white '>
                <th className='px-3 py-2 text-left w-[150px]'>
                  Picture
                </th>
                <th className='px-3 py-2 text-left'>
                  Name
                </th>
                <th className='px-3 py-2 text-left'>
                  Available
                </th>
                <th className='px-3 py-2 text-left'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((book,index)=>{
                  return(
                    <tr key={index}>
                    <td className='px-3 py-2 text-left w-[150px]'>
                      <div className='w-full h-full flex justify-center items-center'>

                      <img src={`${process.env.REACT_APP_SERVER_URL}/assets/${book.photo[0]}`} alt="Book Image" className='w-[100px] h-[100px] object-contain' />
                      </div>
                    </td>
                    <td className='px-3 py-2 text-left '>
                      {book.name}
                    </td>
                    <td className='px-3 py-2 text-left '>
                      {book.quantity}
                    </td>
                    <td className='px-3 py-2 text-left '>
                      <div>
                        <Link to={`edit/${book._id}`}><EditIcon/></Link>
                        <Link to={`/admin/issue-books?bookId=${book._id}`}><BeenhereIcon/></Link>
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

    </>
  )
}

export default Books
