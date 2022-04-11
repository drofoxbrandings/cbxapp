import React from "react";
import { Container, Grid } from '@mui/material'

const User = () => {
    return (
        <div>
            <Container sx={{ mt: 2 }}>
                <Grid container>
                    <Grid item md={4} sx={{ position: 'absolute', left: '50%', transform: "translateX(-50%)" }}>
                        <img width="100%" src="https://cdn.dribbble.com/users/966681/screenshots/2896143/working.gif" alt="working" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default User