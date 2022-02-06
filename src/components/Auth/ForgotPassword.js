import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import ForgotPasswordForm from '../Form/ForgotPasswordForm'
import useStyles from './AuthStyles'

const ForgotPassword = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.loginContainer}>
            <Grid item xs={12} md={8} lg={3}>
                <Paper className={classes.loginForm} elevation={3}>
                    <Typography variant="h4" component="h4">Get Link</Typography>
                    <ForgotPasswordForm />
                </Paper>
            </Grid>
        </Grid>
    )
}
export default ForgotPassword
