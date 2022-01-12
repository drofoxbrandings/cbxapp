import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import LoginForm from '../Form/LoginForm'
import useStyles from './AuthStyles'

const Login = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.loginContainer}>
            <Grid item xs={12} md={8} lg={3}>
                <Paper className={classes.loginForm} elevation={3}>
                    <Typography variant="h4" component="h4">Login</Typography>
                    <LoginForm />
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Login
