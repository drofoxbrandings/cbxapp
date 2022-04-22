import { Form, Formik, Field, ErrorMessage } from 'formik'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import useStyles from './FormStyles'
import { TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material'
import { ChangePassword } from '../../../actions/Auth'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChangePasswordForm = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = useSelector(state => state.AuthReducer.user)
    const navigate = useNavigate()
    const isError = useSelector(state => state.AuthReducer.isError)
    const errorMessage = useSelector(state => state.AuthReducer.errorMessage)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword)
    }
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }
    return (
        <Fragment>
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <Formik
                initialValues={{
                    oldPassword: "",
                    newPassword: ''
                }}
                validationSchema={Yup.object({
                    oldPassword: Yup.string().required("Old password is required")
                        .min(8, "Password should be minimum 8 characters length"),
                    newPassword: Yup.string().required("New password is required")
                        .min(8, "Password should be minimum 8 characters length"),
                })}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    const data = { userId: user.userId, oldPassword: values.oldPassword, newPassword: values.newPassword }
                    dispatch(ChangePassword(data, navigate, resetForm))
                    setSubmitting(false)
                }}
            >
                {
                    formikProps => (
                        <Form onSubmit={formikProps.handleSubmit} autoComplete="off">
                            <div className={classes.formField}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Old password"
                                    type={showOldPassword ? 'text' : 'password'}
                                    name="oldPassword"
                                    value={formikProps.values.oldPassword}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    autoComplete="off"
                                    variant="standard"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowOldPassword}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <ErrorMessage className={classes.errorMsg} component="span" name="oldPassword" />
                            </div>
                            <div className={classes.formField}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="New password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    value={formikProps.values.newPassword}
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    autoComplete="off"
                                    variant="standard"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowNewPassword}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <ErrorMessage className={classes.errorMsg} component="span" name="newPassword" />
                            </div>
                            <Button fullWidth
                                variant="contained"
                                type="submit"
                                className={classes.mup1}>
                                Change Now
                            </Button>
                        </Form>
                    )
                }

            </Formik>
        </Fragment>
    )
}

export default ChangePasswordForm