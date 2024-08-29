import { Modal } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const IssuedBooksModal = ({ open, onClose,data }) => {

   console.log(data);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-Issued-Books"
            aria-describedby="modal-Issued-books"
        >
            <div className='w-full h-full flex justify-center items-center p-2'>
                <div className='flex bg-white p-5 rounded-md w-full max-w-[800px] max-h-[90vh] min-h-[200px] flex-col justify-between gap-4'>
                    <div className='flex justify-between items-center w-full '>
                        <h1 className='text-xl font-medium'>
                            Issued Books
                        </h1>
                        <span className='w-[25px] h-[25px] flex justify-center items-center cursor-pointer' onClick={onClose}>
                            <CloseIcon style={{ width: "100%", height: "100%" }} />
                        </span>
                    </div>
                   
                   <div className='flex flex-col gap-2 overflow-auto p-2'>
                    {
                        data?.map((item)=>{
                            
                            const book=item.bookDetails;

                                return(
                                    <div className={`grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 w-full rounded-md p-4 `} key={book.id} style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" }}>
                                    <div className='w-full h-[150px] flex justify-center items-center' >
                                      <img src={`${process.env.REACT_APP_IMG_SERVER_URL}/${book?.photo[0]}`} alt={book?.name} className='w-full h-full object-contain' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                      <div className='flex flex-col'>
                                        <h2 className='font-semibold text-[18px] leading-[18px]'>
                                          {book?.name}
            
                                        </h2>
                                        <span className='text-[#d2d2d2] text-[14px] '>
                                          by {book?.author?.name}
                                        </span>
                                      </div>
                                      <h3 className='text-[18px] leading-[18px]'>
                                        <span className='text-[14px] text-[#d2d2d2]'>category</span> : {book?.category}
            
                                      </h3>
                                      <h3 className='text-[18px] leading-[18px]'>
            
                                        <span className='text-[14px] text-[#d2d2d2]'>quantity</span> : {book?.quantity}
                                      </h3>
                                      <h3 className='text-[18px] leading-[18px]'>
            
                                        <span className='text-[14px] text-[#d2d2d2]'>Status</span> : {item?.status}
                                      </h3>
                                      <h3 className='text-[18px] leading-[18px]'>
            
                                        <span className='text-[14px] text-[#d2d2d2]'>Issued Date</span> : {item?.issueDate?.split("T")[0]}
                                      </h3>
                                      {/* <button onClick={() => handleBookSelect(book)} className='mt-2 w-full md:max-w-max px-4 h-[40px] bg-[--color-primary] text-white text-[16pxs] rounded-md'>
                                        {selected ? 'Book Selected' : 'Select Book'}
                                      </button> */}
                                    </div>
                                  </div>
                                )
                            
                        })
                    }
                   
                   </div>
                   
                </div>
            </div>

        </Modal>
    )
}

export default IssuedBooksModal
