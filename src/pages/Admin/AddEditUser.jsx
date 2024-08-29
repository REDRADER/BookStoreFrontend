import PageContainer from 'components/PageContainer'
import useBackdrop from 'hooks/useBackdrop'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PrivateComponent } from 'api/axios'
import * as yup from 'yup'
import { Photo } from '@mui/icons-material'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FileUploader from 'components/FileUploader'
import axios from 'axios'


const formValidationSchema = yup.object({

  name: yup.string().required("Name is Required"),
  email: yup.string().required("Email is Required"),
  phone: yup.string().required("Phone is Required"),
  

})


const AddEditUser = () => {

 
  const { id } = useParams();
  const { openBackdrop, closeBackdrop, BackdropComponent } = useBackdrop();
  const privateAxios = PrivateComponent();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })

  // const getImage=async(name)=>{
  //   openBackdrop();
  //     try {
  //         const res=await axios.get(`${process.env.REACT_APP_SERVER_URL}/assets/${name}`,{responseType:"blob"});
  //         const file = new File([res.data], name, { type: res.data.type });
  //         return file;
  //     } catch (error) {
  //       alert("Erorr Getting Image")
  //       return null;
  //     }
  //     closeBackdrop();
  // }

  const getData = async () => {
    openBackdrop();
    try {
      const res = await privateAxios.get(`/admin/user/${id}`);
      const { data } = res;
    
    
   
      setInitialValues({
        name: data.name,
        email:data.email,
        phone: data.phone,
        password: data?.password,
      })
    } catch (error) {
      console.log(error)
      alert("Error", "error getting Book Data")
    }
    closeBackdrop();
  }
  useEffect(() => {
    if (id) {

      getData();
    }
  }, [id])


  const formSubmit = async (values, { setSubmitting }) => {
    openBackdrop();
    try {

     

      const payload = { ...values }
     


      let URL=""
      if(id)
      {
        URL=`/admin/edit-user/${id}`
      }
      else{
        URL=`/admin/addUser`
      }

      const response = await privateAxios.post(`${URL}`, payload);
      if(id)
        {
          alert("User Updated Successfully")
        }
        else{
          
          alert("User Added Successfully")
        }
      navigate(-1);


    } catch (error) {

      console.log(error)
      alert("error", `Error Adding User`)



    }



    setSubmitting(false);
    closeBackdrop();
  }

  return (
    <>
      <BackdropComponent />
      <PageContainer>
        <div className='flex items-center justify-between w-full border-b-2 py-2 px-3 flex-wrap'>
          <h1 className='text-2xl md:text-4xl font-semibold'>
            {
              !id ? "Add User" : "Edit User"
            }

          </h1>


        </div>

        <div className='w-full justify-center h-full  overflow-auto pb-5'>
          <Formik
            initialValues={initialValues}
            validationSchema={formValidationSchema}
            onSubmit={formSubmit}
            enableReinitialize
          >

            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
              return (
                <Form className='flex flex-col gap-5'>
                  <div className='grid grid-cols-1  h-full'> 

                 
                  <div className='p-2 w-full h-full flex flex-col gap-5 order-2 md:order-1'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="name">Name <span className='text-red-600'>*</span></label>
                      <Field name="name" type="text" placeholder="Enter User Name" className="w-full h-[40px] px-3 border rounded-md" />
                      <ErrorMessage name='name' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="email">Email <span className='text-red-600'>*</span></label>
                      <Field name="email" type="text" placeholder="Enter User Email" className="w-full h-[40px] px-3 border rounded-md" />
                      <ErrorMessage name='email' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>


                    </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="phone">Phone <span className='text-red-600'>*</span></label>
                      <Field name="phone" type="text" placeholder="Enter Phone" className="w-full h-[40px] px-3 border rounded-md" />
                      <ErrorMessage name='phone' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="password">Password </label>
                      <Field name="password" type="text" placeholder="Enter Password" className="w-full h-[40px] px-3 border rounded-md" />
                      <ErrorMessage name='password' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>


                    </div>
                   



                  </div>
                 
                  </div>
                  <div className='flex justify-center items-center px-2'>
                    <button className='h-[45px] bg-[--color-primary] text-white w-full rounded-lg text-lg'>Submit</button>
                  </div>
                </Form>
              )
            }
            }
          </Formik>
        </div>

      </PageContainer>
    </>
  )
}

export default AddEditUser
