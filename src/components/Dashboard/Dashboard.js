import React from 'react'
import { Grid, Container, Typography, Paper, CircularProgress, Backdrop } from '@mui/material'
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const isLoading = useSelector((state) => state.AuthReducer.isLoading)
    return (
        <div>
            <Container sx={{ mt: 2 }}>
                <Grid container>
                    <Grid item md={6} sx={{ position: 'absolute', left: '50%', transform: "translateX(-50%)" }}>
                        <Paper sx={{ padding: '1rem' }}>
                            <Typography variant="h3" sx={{ marginBottom: '1rem' }}>Welcome to Citybox cargo movers.</Typography>
                            <Typography>Please select shipment from menu to view/add/update/delete shipment information</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading && isLoading}>
                    <CircularProgress />
                </Backdrop>
            </Container>
        </div>
    )
}

export default Dashboard
