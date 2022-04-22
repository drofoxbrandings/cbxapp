import React, { Fragment } from 'react'
import { Grid, Paper } from '@mui/material'
import ChangePasswordForm from '../Auth/Form/ChangePasswordForm'

const ChangePassword = () => {
  return (
    <Fragment>
      <Grid container sx={{justifyContent: 'center'}}>
        <Grid item md={4}>
          <Paper sx={{padding: '1rem'}}>
            <ChangePasswordForm />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default ChangePassword