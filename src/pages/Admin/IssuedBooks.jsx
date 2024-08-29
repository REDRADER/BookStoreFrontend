import PageContainer from 'components/PageContainer'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import useBackdrop from 'hooks/useBackdrop';
import { PrivateComponent } from 'api/axios';
import EditIcon from '@mui/icons-material/Edit';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ReturnModal from 'components/ReturnModal';
const IssuedBooks = () => {
  const [search, setSearch] = useState("");

  const { openBackdrop, closeBackdrop, BackdropComponent } = useBackdrop();

  const privateAxios = PrivateComponent();
  const [data, setData] = useState([]);

  const getData = async () => {
    openBackdrop();
    try {
      const res = await privateAxios.get(`/admin/history`)
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

  const [selectedBook,setSelectedBook]=useState({})
  const [returnModal,setReturnModal]=useState(false);
  const handleReturnModal=(data)=>{
    setReturnModal(prev=>!prev);
   
    if(data?.historyId)
    {
      setSelectedBook(data);
    }
  }


  const handleReturn = async (data) => {
    openBackdrop();
    try {

      
      const payload = {
        bookId: selectedBook.bookDetails.id,
        userId: selectedBook.userDetails.id,
        returnDate: new Date().toISOString(),
        remark: data.remark
      }
      const res = await privateAxios.post(`/admin/returnBook`,payload);
      if(res.status===200)
      {
        alert("Book Returned Successfully")
      }
      handleReturnModal();
      getData();
    } catch (error) {
      console.log(error)
      alert("Error Returning Book")
    }
    closeBackdrop();
  }

  return (
    <>
      <BackdropComponent />
      <PageContainer>
        <div className='flex items-center justify-between w-full border-b-2 py-3 px-3 flex-wrap gap-3'>
          <h1 className='text-2xl md:text-4xl font-semibold order-1'>
            Issued Books
          </h1>
          <div className='w-full md:w-[200px] lg:min-w-[350px] rounded-lg border flex items-center pl-2 pr-3 gap-1 order-3 md:order-2'>
            <SearchIcon className='w-[15px] h-[20px]' />
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className='w-full h-[35px] rounded-lg  outline-none border-none bg-none' />

          </div>
          <Link to={"/admin/issue-books"} className='bg-[--color-primary] py-2 px-3 rounded-md font-medium text-white order-2 md:order-3'>New Issue </Link>
        </div>
        <div className='w-full flex justify-start items-start overflow-auto rounded-lg border-[1px]'>
          <table className='w-full border-collapse min-w-[1000px] rounded-t-lg'>
            <thead className='rounded-t-lg'>
              <tr className='bg-[#f9fafb] border-b-[1px] border-b-[#d2d2d2] text-[14px] font-semibold rounded-t-lg '>
                <th className='px-3 py-2 text-left w-[70px] text-[#313131]'>
                  Sr No.
                </th>
                <th className='px-3 py-2 text-left w-[100px] text-[#313131]'>
                  Picture
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Name
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Issue Date
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Expected Date
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Return Date
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Issued To
                </th>
                <th className='px-3 py-2 text-left text-[#313131] text-[14px] font-semibold'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.filter((item) => (item.bookDetails.name.toLowerCase().includes(search) || item.bookDetails.author.name.toLowerCase().includes(search) || item.bookDetails.category.toLowerCase().includes(search)))
                .map((book, index) => {
                  return (
                    <tr key={index} className={`border-b`}>
                      <td className='px-3 py-2 text-left w-[70px] text-[15px] '>
                        {index + 1}
                      </td>
                      <td className={`px-3 py-2 text-left w-[100px]`}>
                        <div className='w-full h-full flex justify-start items-center'>

                          <img src={`${process.env.REACT_APP_SERVER_URL}/assets/${book.bookDetails.photo[0]}`} alt="Book Image" className='w-[60px] h-[60px] object-cover' />
                        </div>
                      </td>
                      <td className='px-3 py-2 text-left '>
                        <div className='flex w-full h-full flex-col'>
                          <h3 className='text-[15px] leading-[18px]'>

                            {book.bookDetails.name}
                          </h3>
                          <span className='text-[12px] text-[#505050]'>
                            by {book.bookDetails.author.name}
                          </span>
                        </div>
                      </td>
                      <td className='px-3 py-2 text-left text-[15px]'>
                        {book?.issueDate?.split("T")[0]}
                      </td>
                      <td className='px-3 py-2 text-left text-[15px]'>
                        {book?.expectedReturnDate?.split("T")[0]}
                      </td>
                      <td className='px-3 py-2 text-left text-[15px]'>
                        {book?.returnDate?.split("T")[0] || "-"}
                      </td>
                      <td className='px-3 py-2 text-left text-[15px]'>
                        <div className='flex w-full h-full flex-col'>
                          <h3 className='text-[15px] leading-[18px]'>

                            {book.userDetails.name}
                          </h3>
                          <span className='text-[12px] text-[#505050]'>
                            Email: {book.userDetails.email}
                          </span>
                          <span className='text-[12px] text-[#505050]'>
                            Phone: {book.userDetails.phone}
                          </span>
                        </div>
                      </td>
                      <td className='px-3 py-2 text-left w-[150px] '>
                        <div className='flex gap-2'>
                          {
                            book.status === "issued" ?
                            <button className='px-3 bg-[--color-primary] py-2 rounded-md text-white' onClick={() => handleReturnModal(book)}>Return Book</button>
                            :
                            "Returned"
                          }
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
      <ReturnModal open={returnModal} onClose={handleReturnModal} onSubmit={handleReturn} />

    </>
  )
}

export default IssuedBooks
