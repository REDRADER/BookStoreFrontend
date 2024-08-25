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
    const [showPassword, setShowPassword] = useState("password");

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
                    alert("error", "Error loging In")
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
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formValidationSchema}
                    onSubmit={formSubmit}
                >

                    {
                        ({ isSubmitting, errors }) => {

                            return (
                                <Form className="">

                                    <div className="">
                                        <label htmlFor="email">
                                            Name
                                        </label>
                                        <Field name="email" type="email" placeholder={`Enter your Email Id`} />
                                        <ErrorMessage name='email' component="span" />


                                    </div>

                                    <div className="">
                                        <label htmlFor="password">
                                            Password:
                                        </label>
                                        <Field name="password" placeholder="Enter your Password" type={showPassword ? 'text' : 'password'} />
                                        <div className="">
                                            {showPassword ? (
                                                <VisibilityOff onClick={() => setShowPassword(false)} />
                                            ) : (
                                                <Visibility onClick={() => setShowPassword(true)} />
                                            )}
                                        </div>
                                        <ErrorMessage name='password' component="span" />

                                    </div>

                                    <div className="">
                                        <Link to="/reset-password">Forgot Password?</Link>
                                    </div>


                                    <div className="">
                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </div>

                                </Form>
                            )
                        }
                    }


                </Formik>
            </div>
        </>
    )
}

export default Login
