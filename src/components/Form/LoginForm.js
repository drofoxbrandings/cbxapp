import { TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Button } from '@mui/material';
import useStyles from './FormStyles'
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../actions/Auth'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import _ from 'lodash';

const LoginForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const state = useSelector(state => state.AuthReducer)
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [isError, setIsError] = useState(false)


    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                validationSchema={Yup.object({
                    username: Yup.string().required("Username is required").email('Invalid username'),
                    password: Yup.string()
                        .required("Password is required")
                        .min(8, "Incorrect password")
                })}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(Login(values))
                    setIsError(state.isError)
                    if (isError === true) {
                        console.log("error")
                    }
                    else{
                        console.log("success")
                    }
                    setSubmitting(false)
                }}
            >
                {
                    formik => (
                        <React.Fragment>
                            <Form onSubmit={formik.handleSubmit} autoComplete="off">
                                <div className={classes.formField}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Username"
                                        type="email"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        autoComplete="off"
                                        variant="standard"
                                    />
                                    <ErrorMessage className={classes.errorMsg} component="span" name="username" />
                                </div>
                                <div className={classes.formField}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formik.values.password}
                                        autoComplete="off"
                                        variant="standard"
                                    />
                                    <ErrorMessage className={classes.errorMsg} component="span" name="password" />
                                </div>
                                <Button fullWidth variant="contained" type="submit">Login</Button>
                            </Form>
                            <Typography className={classes.selfEnd}>I forgot my password</Typography>
                        </React.Fragment>
                    )
                }
            </Formik>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </React.Fragment>
    )
}

export default LoginForm
