import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import ResetPasswordForm from './Form/ResetPasswordForm'
import useStyles from './AuthStyles'

const ResetPassword = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.loginContainer}>
            <Grid item xs={12} md={8} lg={3}>
                <Paper className={classes.loginForm} elevation={3}>
                    <Typography variant="h4" component="h4">Reset Password</Typography>
                    <ResetPasswordForm />
                </Paper>
            </Grid>
        </Grid>
    )
}
export default ResetPassword
