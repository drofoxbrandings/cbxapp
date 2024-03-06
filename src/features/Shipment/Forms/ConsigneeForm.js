import { Box, FormControl, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";

const ConsigneeForm = (props) => {

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <FormControl fullWidth margin="dense">
        <Controller
          name="consigneeName"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.consigneeName
                ? props?.data?.consigneeName
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
          name="consigneeEmail"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.consigneeEmail
                ? props?.data?.consigneeEmail
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
          name="consigneePhone"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.consigneePhone
                ? props?.data?.consigneePhone
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
          name="delliverLocation"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.delliverLocation
                ? props?.data?.delliverLocation
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
          name="deliveryCity"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.deliveryCity
                ? props?.data?.deliveryCity
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
          name="deliveryCountry"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.deliveryCountry
                ? props?.data?.deliveryCountry
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
      <FormControl fullWidth margin="dense">
        <Controller
          name="consigneePostalCode"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.consigneePostalCode
                ? props?.data?.consigneePostalCode
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
              label="Postal code"
              type="text"
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default ConsigneeForm;
