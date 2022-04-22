import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Alert, Backdrop, CircularProgress } from '@mui/material';
import useStyles from './FormStyles'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SendResetLink } from '../../../actions/Auth'

const ForgotPassword = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isError =  useSelector((state) => state.AuthReducer.isError)
    const errorMessage =  useSelector((state) => state.AuthReducer.errorMessage)
    const isLoading =  useSelector((state) => state.AuthReducer.isLoading)

    return <React.Fragment>
         {isError && <Alert severity="error">{errorMessage}</Alert>}
        <Formik
            initialValues={{
                email: ""
            }}
            validationSchema={Yup.object({
                email: Yup.string().required("Email is required").email('Invalid Email'),
            })}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                dispatch(SendResetLink(values, resetForm))
                setSubmitting(false)
            }}
        >
            {
                formik => (
                    <React.Fragment>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className={classes.formField}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                    variant="standard"
                                />
                                <ErrorMessage className={classes.errorMsg} component="span" name="email" />
                            </div>
                            <Button fullWidth
                                variant="contained"
                                type="submit"
                                className={classes.mup1}>
                                Get Link
                            </Button>
                            <Button fullWidth
                                variant="outlined"
                                type="button"
                                className={classes.mup1}
                                href='/'
                                >
                                Back to Login
                            </Button>
                        </Form>
                        
                    </React.Fragment>
                )
            }
        </Formik>
        {
                isLoading &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
    </React.Fragment>
};

export default ForgotPassword;
