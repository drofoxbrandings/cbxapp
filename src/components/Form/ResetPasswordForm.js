import { Button, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import * as Yup from 'yup'
import useStyles from './FormStyles'
import { useDispatch } from 'react-redux';
import { ResetPassword } from '../../actions/Auth'
import { useNavigate, Link } from 'react-router-dom';

const ResetPasswordForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isError, setIsError] = useState("")
    return <Fragment>
        <Formik
            initialValues={{
                password: ""
            }}
            validationSchema={Yup.object().shape({
                password: Yup.string()
                    .required('Please enter the new password')
                    .min(8, 'Requires minimum 8 characters')
                    .matches(/(?=.*[A-Z])/, 'Requires atleast one uppercase letter')
                    .matches(/(?=.*[0-9])/, 'Requires atleast one numeric character')
                    .matches(/(?=.*[!@#$%^&*])/, 'Requires atleast one special character')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const user = urlParams.get('user')
                const token = urlParams.get('token')
                const data = {
                    userId: user, 
                    resetToken: token,
                    password: Object.values(values)
                }
                dispatch(ResetPassword(data, setIsError, navigate))
            }}
        >
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <div className={classes.formField}>
                        <Field fullWidth as={TextField} type="password" name="password" id="password" label="Password" variant="standard" />
                        <ErrorMessage className={classes.errorMsg} component="span" name="password" />
                    </div>
                    <Button type="submit" fullWidth variant="contained" color="primary">Reset Password</Button>
                </Form>
            )}
        </Formik>
    </Fragment>
};

export default ResetPasswordForm;
