import PageContainer from 'components/PageContainer'

import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import useBackdrop from 'hooks/useBackdrop';
import { PrivateComponent } from 'api/axios';




const IssueBook = () => {

  const [formData, setFormData] = useState({
    issueDate: '',
    expectedReturnDate: '',
    remark: ''
  })
  const { openBackdrop, closeBackdrop, BackdropComponent } = useBackdrop()
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('bookId');
  const navigate=useNavigate();
 
  const privateAxios = PrivateComponent();
  const [query, setQuery] = useState("")
  const [userQuery, setUserQuery] = useState("")
  const [bookData, setBookData] = useState({});
  const [userData, setUserData] = useState({})
  const [allBooks, setAllBooks] = useState([]);
  const [allUsers, setAllUsers] = useState([])


  const handleFormData=(e)=>{

    const {value,name}=e.target;
    setFormData(prev=>{
      return{
        ...prev,
        [name]:value
      }
    })

  }



  const getBookData = async () => {
    openBackdrop();
    try {
      const URL = (id && !query) ? `/books/${id}` : `/books/search?q=${query}`
      const res = await privateAxios.get(`${URL}`);
      const data = id ? [res.data] : res.data
      if (id) {
        setBookData(res.data);
      }
      setAllBooks(data);

    } catch (error) {
      alert("error getting Book Data");
    }

    closeBackdrop();
  }

  const handleBookSelect = (book) => {
    if (bookData._id === book._id) {
      setBookData({})
    }
    else {

      setBookData(book)
    }
  }

  useEffect(() => {
    if (id) {
      getBookData();
    }
  }, [id])

  const searchUsers = async () => {
    openBackdrop();
    try {
      const URL = `/admin/getusers?search=${userQuery}`
      const res = await privateAxios.get(`${URL}`);
      setAllUsers(res.data);
    } catch (error) {
      alert("error getting Book Data");
    }

    closeBackdrop();
  }
  const handleUserSelect = (user) => {
    if (userData._id === user._id) {
      setUserData({})
    }
    else {

      setUserData(user)
    }
  }

  const issueBookSubmit = async () => {
    openBackdrop();
    try {


      const payload = {
        bookId: bookData._id,
        userId: userData._id,
        issueDate: new Date(formData.issueDate).toISOString(),
        expectedReturnDate: new Date(formData.expectedReturnDate).toISOString(),
        status: "issued",
        remark: formData.remark
      }
    
      const res = await privateAxios.post(`/admin/issueBook`, payload)
     if(res.status===200)
     {
      alert("Book Issued Successfully")
      navigate(-1)
     }
    } catch (error) {
      alert("Error Issuing Book")
    }
    closeBackdrop();
  }


  return (
    <>
      <BackdropComponent />
      <PageContainer>
        <div className='flex items-center justify-between w-full border-b-2 py-3 px-3 flex-wrap min-w-[600px]'>
          <h1 className='text-4xl font-semibold'>
            Issue Book
          </h1>

          <Link to={"add"} className='bg-[--color-primary] py-2 px-3 rounded-md font-medium text-white'>Add Book</Link>
        </div>
        <div className='w-full rounded-lg p-3 overflow-auto pb-2 flex flex-col gap-3' style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            
         
          <div className='w-full flex gap-1 flex-col '>
            <label htmlFor=""> Issue Date</label>
            <input type="date" required value={formData.issueDate} name='issueDate' min={new Date().toISOString().split("T")[0]}  onChange={handleFormData} className='h-[40px] w-full  rounded-md border px-3 border-[#d2d2d2] focus:border-[#1b1b1b] outline-none' />
           
          </div>
          <div className='w-full flex gap-1 flex-col '>
            <label htmlFor=""> Expected Return Date</label> 
            <input type="date" required value={formData.expectedReturnDate} min={formData.issueDate} name='expectedReturnDate' onChange={handleFormData} className='h-[40px] w-full  rounded-md border px-3 border-[#d2d2d2] focus:border-[#1b1b1b] outline-none' />
           
          </div>
          </div>
          <div className='w-full flex gap-1 flex-col '>
            <label htmlFor=""> Expected Return Date</label>
            <textarea  value={formData.remark} onChange={handleFormData} name='remark' className='h-[100px] w-full  rounded-md border px-3 border-[#d2d2d2] focus:border-[#1b1b1b] outline-none' />
           
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 h-[calc(100% - 80px)]'>
          <div className='w-full rounded-lg p-3 h-full overflow-auto pb-2' style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}>
            <div className='flex flex-col h-full overflow-auto w-full gap-3'>
              <div>

                <h2 className='text-2xl font-medium'>Search Book</h2>
                <form className='w-full flex gap-2 ' onSubmit={(e) => { e.preventDefault(); getBookData(); }} >
                  <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className='h-[40px] w-full flex flex-grow-1 rounded-md border px-3 border-[#d2d2d2] focus:border-[#1b1b1b] outline-none' />
                  <button className='px-5 rounded-md bg-[--color-primary] text-white' type='submit' >Submit</button>
                </form>
              </div>

              <div className='flex w-full h-full overflow-y-auto flex-col gap-2 p-1'>
                {
                  allBooks.map((book) => {
                    const selected = book._id === bookData._id;
                    return (
                      <div className={`grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 w-full rounded-md p-4 ${selected ? 'outline outline-[--color-primary]' : ''}`} key={book._id} style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" }}>
                        <div className='w-full h-[150px] flex justify-center items-center' >
                          <img src={`${process.env.REACT_APP_IMG_SERVER_URL}/${book.photo[0]}`} alt={book.name} className='w-full h-full object-contain' />
                        </div>
                        <div className='flex flex-col gap-1'>
                          <div className='flex flex-col'>
                            <h2 className='font-semibold text-[18px] leading-[18px]'>
                              {book.name}

                            </h2>
                            <span className='text-[#d2d2d2] text-[14px] '>
                              by {book.author.name}
                            </span>
                          </div>
                          <h3 className='text-[18px] leading-[18px]'>
                            <span className='text-[14px] text-[#d2d2d2]'>category</span> : {book.category}

                          </h3>
                          <h3 className='text-[18px] leading-[18px]'>

                            <span className='text-[14px] text-[#d2d2d2]'>quantity</span> : {book.quantity}
                          </h3>
                          <button onClick={() => handleBookSelect(book)} className='mt-2 w-full md:max-w-max px-4 h-[40px] bg-[--color-primary] text-white text-[16pxs] rounded-md'>
                            {selected ? 'Book Selected' : 'Select Book'}
                          </button>
                        </div>
                      </div>
                    )
                  })
                }


              </div>


            </div>
          </div>
          <div className='w-full rounded-lg p-3' style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}>
            <div className='flex flex-col w-full gap-3'>
              <div>

                <h2 className='text-2xl font-medium'>Search User</h2>
                <form className='w-full flex gap-2 ' onSubmit={(e) => { e.preventDefault(); searchUsers(); }} >
                  <input type="text" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} className='h-[40px] w-full flex flex-grow-1 rounded-md border px-3 border-[#d2d2d2] focus:border-[#1b1b1b] outline-none' />
                  <button className='px-5 rounded-md bg-[--color-primary] text-white' type='submit' >Submit</button>
                </form>
              </div>
              <div className='flex w-full h-full overflow-y-auto flex-col gap-2 p-1'>
                {
                  allUsers.map((user) => {
                    const selected = user._id === userData._id;
                    return (
                      <div className={`flex justify-center items-center  w-full rounded-md p-4 ${selected ? 'outline outline-[--color-primary]' : ''}`} key={user._id} style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" }}>

                        <div className='flex flex-col w-full gap-1'>




                          <h3 className='text-[18px] leading-[18px]'>
                            <span className='text-[14px] text-[#d2d2d2]'>Name</span> : {user.name}

                          </h3>
                          <h3 className='text-[18px] leading-[18px]'>
                            <span className='text-[14px] text-[#d2d2d2]'>Phone</span> : {user.phone}

                          </h3>
                          <h3 className='text-[18px] leading-[18px]'>

                            <span className='text-[14px] text-[#d2d2d2]'>Email</span> : {user.email}
                          </h3>
                          <h3 className='text-[18px] leading-[18px]'>

                            <span className='text-[14px] text-[#d2d2d2]'> Issued Books</span> : {user.books.length}
                          </h3>
                          <button onClick={() => handleUserSelect(user)} className='mt-2 w-full md:max-w-max px-4 h-[40px] bg-[--color-primary] text-white text-[16pxs] rounded-md'>
                            {selected ? 'User Selected' : 'Select User'}
                          </button>
                        </div>
                      </div>
                    )
                  })
                }


              </div>
            </div>

          </div>
        </div>
        <div className='w-full p-3 '>
          <button className='w-full bg-[--color-primary] text-white text-[16px] px-3 h-[40px] rounded-md' onClick={issueBookSubmit}>Issue Book</button>
        </div>
      </PageContainer>
    </>
  )
}

export default IssueBook
