import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useStyles from './ProfileStyles'
import {Link} from 'react-router-dom'

const Profile = () => {
    const user = useSelector(state => state.UserReducer.user)
    const classes = useStyles()

    useEffect(() => {

    }, [])

    return (
        <Container>
            <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item xs={12} md={4} >
                    <Card className={classes.profileCard} >
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Avatar className={classes.avatar}></Avatar>
                            <Typography sx={{ color: '#fff', marginBottom: '.5rem' }}>{user.data.firstName} {user.data.LastName} </Typography>
                            <Typography sx={{ color: '#fff', marginBottom: '.5rem' }}>{user.data.email}</Typography>
                            <Typography sx={{ color: '#fff', marginBottom: '.5rem' }}>{user.data.phone}</Typography>
                        </CardContent>
                        <CardActions className={classes.actionPanel}>
                            <div className={classes.badgeContainer}>
                                <Typography className={classes.badge}>{user.data.role}</Typography>
                                <Typography className={classes.badge}>{user.data.employeeId}</Typography>
                            </div>
                            <Button component={Link} variant="contained" to="/changePassword">Change password</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Profile