import React from 'react'
import NavBar from './NavBar/NavBar'
import NavButton from './NavBar/NavButton'
import { MainNavigation } from '../../constants/MainNavigation'
import { Grid, Container } from '@mui/material'

const Dashboard = () => {
    return (
        <div>
            <NavBar />
            <Container sx={{ mt: 2 }}>
                <Grid container>
                    <Grid item xs={12} md={12} >
                        {MainNavigation.map((navItem, i) => (
                            <NavButton menuItem={navItem.navItem} menuIcon={navItem.navIcon} />
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Dashboard
