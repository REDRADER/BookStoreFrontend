import { Modal } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const ReturnModal = ({ open, onClose, onSubmit }) => {

    const [remark,setRemark]=useState("")

    const handleSubmit=()=>{
        onSubmit({
            remark:remark
        })
        setRemark("")
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-Return-Book"
            aria-describedby="modal-Return-book"
        >
            <div className='w-full h-full flex justify-center items-center p-2'>
                <div className='flex bg-white p-5 rounded-md w-[500px] min-h-[200px] flex-col justify-between gap-4'>
                    <div className='flex justify-between items-center w-full '>
                        <h1 className='text-xl font-medium'>
                            Return Book
                        </h1>
                        <span className='w-[25px] h-[25px] flex justify-center items-center cursor-pointer' onClick={onClose}>
                            <CloseIcon style={{ width: "100%", height: "100%" }} />
                        </span>
                    </div>
                    <div className='w-full h-full flex flex-col gap-1'>
                        <label htmlFor="" className='text-[14px] text-[#181818]'>Remark</label>
                        <textarea name="remark" id="" value={remark} onChange={(e)=>setRemark(e.target.value)} className='p-2 h-[100px] w-full border border-[#d2d2d2] rounded-md'  ></textarea>
                    </div>
                    <div className='flex w-full justify-end items-end gap-3'>
                        <button className='px-3 py-2 rounded-md ' onClick={onClose}>Cancel</button>
                        <button className='px-3 py-2 rounded-md bg-[--color-primary] text-white' onClick={handleSubmit}>Return Book</button>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default ReturnModal
