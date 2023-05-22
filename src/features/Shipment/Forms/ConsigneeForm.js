import { Box, FormControl, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const ConsigneeForm = (props) => {
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <FormControl fullWidth margin="dense">
        <Controller
          name="consigneeName"
          control={props.control}
          ref={props.ref}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="Name"
              type="text"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="consigneeEmail"
          control={props.control}
          ref={props.ref}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="Email"
              type="email"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="consigneePhone"
          control={props.control}
          ref={props.ref}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="Mobile number"
              type="text"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="delliverLocation"
          control={props.control}
          ref={props.ref}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="Street"
              type="text"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="deliveryCity"
          control={props.control}
          ref={props.ref}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="State"
              type="text"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="deliveryCountry"
          control={props.control}
          ref={props.ref}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="Country"
              type="text"
            />
          )}
        />
      </FormControl>
    </Box>
  )
}

export default ConsigneeForm