import { PrivateComponent } from 'api/axios'
import useBackdrop from 'hooks/useBackdrop'
import React, { useEffect, useState } from 'react'

const DashBoard = () => {
    const [data, setData] = useState([])
    const privateAxios = PrivateComponent()
    const { openBackdrop, closeBackdrop, BackdropComponent } = useBackdrop();
    const getData = async () => {
        openBackdrop();
        try {
            const res = await privateAxios.get(`/admin/dashboard`);
            setData(res.data);
        } catch (error) {
            alert("error Getting data");
        }
        closeBackdrop();
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <BackdropComponent />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full h-full'>
                <div className='flex bg-white p-3 w-full h-full flex-col justify-center items-center gap-6'>
                    <h2 className='text-2xl md:text-4xl font-bold'>
                        Total Books
                    </h2>
                    <h1 className='text-6xl text-[var(--color-primary)] md:text-8xl font-extrabold'>
                        {data?.totalBooks}
                    </h1>

                </div>
                <div className='flex bg-white p-3 w-full h-full flex-col justify-center items-center gap-6'>
                    <h2 className='text-2xl md:text-4xl font-bold'>
                        Total Users
                    </h2>
                    <h1 className='text-6xl text-[var(--color-primary)] md:text-8xl font-extrabold'>
                        {data?.totalUsers}
                    </h1>

                </div>
                <div className='flex bg-white p-3 w-full h-full flex-col justify-center items-center gap-6'>
                    <h2 className='text-2xl md:text-4xl font-bold'>
                        Total Available Copies
                    </h2>
                    <h1 className='text-6xl text-[var(--color-primary)] md:text-8xl font-extrabold'>
                        {data?.totalCopies}
                    </h1>

                </div>
                <div className='flex bg-white p-3 w-full h-full flex-col justify-center items-center gap-6'>
                    <h2 className='text-2xl md:text-4xl font-bold'>
                        Total Issued Copies
                    </h2>
                    <h1 className='text-6xl text-[var(--color-primary)] md:text-8xl font-extrabold'>
                        {data?.totalIssuedBooks}
                    </h1>

                </div>

            </div>
        </>
    )
}

export default DashBoard
