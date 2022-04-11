import React from 'react'
import { Grid, Container, Typography, Paper } from '@mui/material'

const Dashboard = () => {
    return (
        <div>
            <Container sx={{ mt: 2 }}>
                <Grid container>
                    <Grid item md={6} sx={{ position: 'absolute', left: '50%', transform: "translateX(-50%)" }}>
                        <Paper sx={{padding: '1rem'}}>
                            <Typography variant="h3" sx={{ marginBottom: '1rem' }}>Welcome to Citybox cargo movers.</Typography>
                            <Typography>Please select shipment from menu to view/add/update/delete shipment information</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Dashboard
