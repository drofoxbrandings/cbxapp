import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@mui/material';
import useStyles from './FormStyles'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { SendResetLink } from '../../actions/Auth'

const ForgotPassword = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isError, setIsError] = useState("")


    return <React.Fragment>
        <Formik
            initialValues={{
                email: ""
            }}
            validationSchema={Yup.object({
                email: Yup.string().required("Email is required").email('Invalid Email'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(SendResetLink(values, setIsError))
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
                        </Form>

                        <div className={classes.flexend}>
                            <Link to='/' className={`${classes.selfEnd} ${classes.link}`}>Login</Link>
                        </div>
                    </React.Fragment>
                )
            }
        </Formik>
    </React.Fragment>
};

export default ForgotPassword;
