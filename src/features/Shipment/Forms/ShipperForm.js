import { Box, FormControl, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";

const ShipperForm = (props) => {

  

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <FormControl fullWidth margin="dense">
        <Controller
          name="shipperName"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.shipperName
                ? props?.data?.shipperName
                : ""
              : ""
          }
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
          name="shipperEmail"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.shipperEmail
                ? props?.data?.shipperEmail
                : ""
              : ""
          }
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
          name="shipperPhone"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.shipperPhone
                ? props?.data?.shipperPhone
                : ""
              : ""
          }
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
          name="shipperLocation"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.shipperLocation
                ? props?.data?.shipperLocation
                : ""
              : ""
          }
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
          name="shipperState"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.shipperState
                ? props?.data?.shipperState
                : ""
              : ""
          }
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
          name="shipperCountry"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.shipperCountry
                ? props?.data?.shipperCountry
                : ""
              : ""
          }
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
  );
};

export default ShipperForm;
