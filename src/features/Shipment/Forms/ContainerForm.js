import { Box, FormControl, FormHelperText, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React from "react";
import { Controller } from "react-hook-form";

const ContainerForm = ({...props}) => {
  return (
    <Box>
      <FormControl fullWidth margin="dense">
        <Controller
          name="containerNumber"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.containerNumber
                ? props?.data?.containerNumber
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
              label="Container number"
              type="text"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="expectedDepartureDate"
          control={props.control}
          ref={props.ref}
          defaultValue={
            props.isEdit
              ? props.data?.expectedDepartureDate
                ? moment(props.data.expectedDepartureDate, "DD-MM-YYYY")
                : null
              : null
          }
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                {...field}
                format="DD-MM-YYYY"
                label="Expected departure date"
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!props?.errors?.expectedDepartureDate,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
        {props?.errors?.expectedDepartureDate && (
          <FormHelperText sx={{ color: "#f44336" }}>
            {props?.errors?.expectedDepartureDate.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="expectedArrivalDate"
          control={props.control}
          ref={props.ref}
          defaultValue={
            props.isEdit
              ? props?.data?.expectedArrivalDate
                ? moment(props?.data?.expectedArrivalDate, "DD-MM-YYYY")
                : null
              : null
          }
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                {...field}
                format="DD-MM-YYYY"
                label="Expected arrival date"
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!props?.errors?.expectedArrivalDate,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
        {props?.errors?.expectedArrivalDate && (
          <FormHelperText sx={{ color: "#f44336" }}>
            {props?.errors?.expectedArrivalDate?.message}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default ContainerForm;
