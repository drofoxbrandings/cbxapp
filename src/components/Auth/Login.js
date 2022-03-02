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
                    <Typography variant="h4" component="h4">Login</Typography>
                    <LoginForm />
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Login
