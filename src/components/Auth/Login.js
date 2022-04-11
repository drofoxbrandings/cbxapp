import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import LoginForm from '../Form/LoginForm'
import useStyles from './AuthStyles'

const Login = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.loginContainer} sx={{ padding: 1 }}>
            <Grid item xs={12} sm={5} md={6} lg={3}>
                <Paper className={classes.loginForm}
                    sx={{
                        zIndex: 9,
                        boxShadow: {
                            md: '-2px 0 5px 0 #0000003d !important',
                            xs: '0 0 5px 0 #0000003d !important'
                        },
                    }}>
                    <img src="https://www.cityboxcargomovers.com/static/media/logo2.64d64f34.svg" alt="" />
                    {/* <img width="100%" src="https://images.unsplash.com/photo-1611242320536-f12d3541249b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" /> */}
                </Paper>
            </Grid>
            <Grid item xs={12} sm={5} md={6} lg={3}>
                <Paper className={classes.loginForm}
                    sx={{
                        boxShadow:
                        {
                            md: '2px 0 5px 0 #0000003d !important',
                            xs: '0 0 5px 0 #0000003d !important'
                        }
                    }}>
                    <Typography variant="h4" component="h4" sx={{textTransform: 'uppercase'}}>Login</Typography>
                    <LoginForm />
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Login
