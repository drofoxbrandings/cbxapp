import { TextField, Typography } from '@mui/material'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Button } from '@mui/material';
import useStyles from './FormStyles'
import { useDispatch } from 'react-redux';
import { Login } from '../../actions/Auth'

const LoginForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
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
    )
}

export default LoginForm
