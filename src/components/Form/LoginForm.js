import { Alert, Backdrop, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Button, InputAdornment, IconButton } from '@mui/material';
import useStyles from './FormStyles'
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../actions/Auth'
import { useNavigate, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

const LoginForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isError = useSelector((state) => state.AuthReducer.isError)
    const errorMessage = useSelector((state) => state.AuthReducer.errorMessage)
    const isLoading = useSelector((state) => state.AuthReducer.isLoading)
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        console.log(showPassword);
        setShowPassword(!showPassword)
    }


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
                    dispatch(Login(values, navigate))
                    setSubmitting(false)
                }}
            >
                {
                    formik => (
                        <React.Fragment>
                            {isError && <Alert severity="error">{errorMessage}</Alert>}
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
                                        type={showPassword ? 'text' : 'password'}
                                        value={formik.values.password}
                                        autoComplete="off"
                                        variant="standard"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                        size="small"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <ErrorMessage className={classes.errorMsg} component="span" name="password" />
                                </div>
                                <Button fullWidth
                                    variant="contained"
                                    type="submit"
                                    className={classes.mup1}>
                                    Login
                                </Button>
                            </Form>
                            <div className={classes.flexend}>
                                <Link to='/forgotPassword' className={`${classes.selfEnd} ${classes.link}`}>I forgot my password</Link>
                            </div>
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
    )
}

export default LoginForm
