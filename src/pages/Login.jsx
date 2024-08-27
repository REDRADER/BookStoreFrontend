import React, { useState } from 'react'
import myaxios from 'api/axios'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useBackdrop from 'hooks/useBackdrop'
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { setLogin } from 'state/AppState'

const formValidationSchema = yup.object({
    email: yup.string().required("Field is Required"),

    password: yup.string()
        .required('Password is required')

})
const Login = () => {
    const initialValues = {
        email: '',
        password: ''
    }
    const { openBackdrop, closeBackdrop, BackdropComponent } = useBackdrop();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);

    const formSubmit = async (values, { setSubmitting }) => {
        console.log("heelo")
        openBackdrop();
        try {



            await myaxios.post(`/auth/login`, { email: values.email, password: values.password })
                .then(async (res) => {
                    const logindata = res.data.user;
                    dispatch(setLogin({
                        token: res.data.token,
                        name: logindata.name,
                        email: logindata.email,
                        role: logindata.role,
                        userData: logindata
                    }))

                    if (res.data.user.role === "ADMIN") {
                        navigate('/admin', { replace: true });

                    }
                    else {
                        navigate('/', { replace: true });

                    }

                }).catch((err) => {
                    alert("Error loging In")
                    console.log(err)
                }
                )


            closeBackdrop()
            setSubmitting(false);


        } catch (error) {

        }
    }


    return (
        <>
            <BackdropComponent />
            <div className='w-full h-screen flex justify-center items-center p-3 '>
                <div className='w-full flex-col gap-5 flex items-center max-w-[400px] px-5 py-[50px] rounded-md' style={{boxShadow:"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}}>

                    <h1 className='text-4xl font-bold'>login</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={formValidationSchema}
                        onSubmit={formSubmit}
                    >

                        {
                            ({ isSubmitting, errors }) => {

                                return (
                                    <Form className=" flex flex-col gap-4 w-full">

                                        <div className="flex flex-col gap-1 relative ">
                                            <label htmlFor="email" className='text-[#505050] text-[15px] leading-[18px]'>
                                                Name:
                                            </label>
                                            <Field name="email" type="email" placeholder={`Enter your Email Id`} className="w-full h-[40px] border border-[#d2d2d2] rounded-md px-2" />
                                            <ErrorMessage name='email' component="span" className='absolute top-[101%] left-0  text-red-500 text-[11px]' />


                                        </div>

                                        <div className="flex flex-col gap-1 relative ">
                                            <label htmlFor="password" className='text-[#505050] text-[15px] leading-[18px]'>
                                                Password:
                                            </label>
                                            <div className="w-full h-[40px] flex items-center border border-[#d2d2d2] rounded-md">
                                                <Field name="password" placeholder="Enter your Password" className="w-full h-full px-2 rounded-md" type={!showPassword ? 'text' : 'password'} />
                                               <span className='p-2'>

                                                {showPassword ? (
                                                    <VisibilityOff onClick={() => setShowPassword(false)} />
                                                ) : (
                                                    <Visibility onClick={() => setShowPassword(true)} />
                                                )}
                                                </span>
                                            </div>
                                            <ErrorMessage name='password' component="span" className='absolute top-[101%] left-0  text-red-500 text-[11px]' />

                                        </div>

                                        {/* <div className=" w-full text-right ">
                                        <Link to="/reset-password">Forgot Password?</Link>
                                    </div> */}



                                        <button type="submit" className='w-full h-[40px] bg-[--color-primary] rounded-md text-white' disabled={isSubmitting}>
                                            Submit
                                        </button>


                                    </Form>
                                )
                            }
                        }


                    </Formik>

                </div>

            </div>
        </>
    )
}

export default Login
