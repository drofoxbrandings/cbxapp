import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const CarrierForm = ({ control, ...props }) => {
  return (
    <Box>
      <FormControl fullWidth margin="dense">
        <Controller
          name="carrierName"
          defaultValue={
            !!props.isEdit
              ? props?.data?.carrierName
                ? props.data.carrierName
                : ""
              : ""
          }
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="Carrier name"
              type="text"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="carrierTrackingId"
          defaultValue={
            !!props.isEdit
              ? props?.data?.carrierTrackingId
                ? props.data.carrierTrackingId
                : ""
              : ""
          }
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="Carrier tracking id"
              type="text"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="carrierLink"
          defaultValue={
            !!props.isEdit
              ? props?.data?.carrierLink
                ? props.data.carrierLink
                : ""
              : ""
          }
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              variant="outlined"
              size="small"
              label="Carrier link"
              type="text"
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default CarrierForm;
