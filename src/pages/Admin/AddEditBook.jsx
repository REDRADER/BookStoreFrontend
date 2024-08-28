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
  description: yup.string().required("description is Required"),
  category: yup.string().required("category is Required"),
  price: yup.number().integer("price should be only Contain Number")
    .required("price is Required"),
  available: yup.string().required("available is Required"),
  authorName: yup.string().required("authorName is Required"),
  authorShortDescripton: yup.string().required("authorShortDescripton is Required"),
  rating: yup.string().required("rating is Required"),
  quantity: yup.number().integer("Quantity should be only Contain Number").required("Quantity is Required"),

})


const AddEditBook = () => {

  const { id } = useParams();
  const { openBackdrop, closeBackdrop, BackdropComponent } = useBackdrop();
  const privateAxios = PrivateComponent();
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    available: "",
    authorName: "",
    authorShortDescripton: "",
    rating: "",
    quantity: 0,

  })

  const getImage=async(name)=>{
    openBackdrop();
      try {
          const res=await axios.get(`${process.env.REACT_APP_SERVER_URL}/assets/${name}`,{responseType:"blob"});
          const file = new File([res.data], name, { type: res.data.type });
          return file;
      } catch (error) {
        alert("Erorr Getting Image")
        return null;
      }
      closeBackdrop();
  }

  const getData = async () => {
    openBackdrop();
    try {
      const res = await privateAxios.get(`/books/${id}`);
      const { data } = res;
      const img=await getImage(data.photo[0])
    
      setPhoto(img);
      setInitialValues({
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        available: data.available,
        authorName: data.author.name,
        authorShortDescripton: data.author.shortDescripton,
        rating: data.rating || 5,
        quantity: data.quantity || 5,
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

      if (!photo) {
        alert("error", "Please Select an Image")
        closeBackdrop();
        return;
      }

      const payload = { ...values }
      payload.pictures = photo
      let pay = new FormData();


      Object.keys(payload).map((item) => {
        pay.set(item, payload[item])
      })


      let URL=""
      if(id)
      {
        URL=`/admin/updateBook/${id}`
      }
      else{
        URL=`/admin/addBooks`
      }

      const response = await privateAxios.post(`${URL}`, pay);
      if(id)
        {
          alert("Book Updated Successfully")
        }
        else{
          
          alert("Book Added Successfully")
        }
      navigate(-1);


    } catch (error) {

      console.log(error)
      alert("error", `Error Adding Book`)



    }



    setSubmitting(false);
    closeBackdrop();
  }

  return (
    <>
      <BackdropComponent />
      <PageContainer>
        <div className='flex items-center justify-between w-full border-b-2 py-2 px-3 flex-wrap'>
          <h1 className='text-4xl font-semibold'>
            {
              !id ? "Add Book" : "Edit Book"
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
                  <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr] h-full'> 

                 
                  <div className='p-2 w-full h-full flex flex-col gap-5 order-2 md:order-1'>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="name">Name <span className='text-red-600'>*</span></label>
                      <Field name="name" type="text" placeholder="Enter Book Name" className="w-full h-[40px] px-3 border rounded-md" />
                      <ErrorMessage name='name' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="description">Description <span className='text-red-600'>*</span></label>
                      <textarea name="description" onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className='w-full h-[150px] px-3 py-3 border rounded-md'
                      />
                      <ErrorMessage name='description' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="category">Category <span className='text-red-600'>*</span></label>
                      <select name="category" onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category}
                        className="w-full h-[40px] px-3 border rounded-md"
                      >
                        <option value="">Please Select category</option>
                        <option value="Adventure stories">Adventure
                          stories</option>
                        <option value="Classics">Classics</option>

                        <option value="Crime">Crime</option>
                        <option value="Fairy tales, fables, and folk tales">Fairy
                          tales, fables, and folk tales</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Historical fiction">Historical
                          fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Humour and satire">Humour and
                          satire</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Plays">Plays</option>
                        <option value="Romance">Romance</option>
                        <option value="Science fiction">Science
                          fiction</option>
                        <option value="Short stories">Short stories</option>
                      </select>
                      <ErrorMessage name='category' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="price">Price <span className='text-red-600'>*</span></label>
                      <Field name="price" type="text" placeholder="Enter Book Price" className="w-full h-[40px] px-3 border rounded-md" />
                      <ErrorMessage name='price' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="authorName">Author Name <span className='text-red-600'>*</span></label>
                      <Field name="authorName" type="text" placeholder="Enter Author Name" className="w-full h-[40px] px-3 border rounded-md" />
                      <ErrorMessage name='authorName' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="authorShortDescripton">Author Description <span className='text-red-600'>*</span></label>
                      <textarea name="authorShortDescripton" onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.authorShortDescripton}
                        className='w-full h-[150px] px-3 py-3 border rounded-md'
                      />
                   
                      <ErrorMessage name='authorShortDescripton' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='relative flex flex-col gap-2 '>
                      <label htmlFor="quantity">Quantity <span className='text-red-600'>*</span></label>
                      <Field name="quantity" type="text" placeholder="Enter Author Short Description" className="w-full h-[40px] px-3 border rounded-md" />
                      <ErrorMessage name='quantity' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div className='relative flex flex-col gap-2 '>
                        <label htmlFor="rating">Rating <span className='text-red-600'>*</span></label>
                        <select name="rating" onChange={handleChange} className="w-full h-[40px] px-3 border rounded-md"
                          onBlur={handleBlur}
                          value={values.rating}>
                          <option value="">Please Select Rating</option>
                          <option value="1">One</option>
                          <option value="2">two</option>
                          <option value="3">three</option>
                          <option value="4">four</option>
                          <option value="5">Five</option>
                        </select>
                        <ErrorMessage name='rating' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                      </div>
                      <div className='relative flex flex-col gap-2 '>
                        <label htmlFor="rating">Available <span className='text-red-600'>*</span></label>
                        <select name="available" className="w-full h-[40px] px-3 border rounded-md"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.available}>
                          <option value="">Please Select Availability</option>
                          <option value="true">Available</option>
                          <option value="false">Not Available</option>

                        </select>
                        <ErrorMessage name='rating' component="span" className='absolute top-[102%] left-0 text-red-600 text-[12px]' />
                      </div>
                    </div>



                  </div>
                  <div className='p-2 w-full  order-1 md:order-1'>
                    <FileUploader onChange={setPhoto} value={photo} />
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

export default AddEditBook
