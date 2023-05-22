import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment/moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const CommodityForm = (props) => {
  
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <FormControl fullWidth margin="dense">
        <Controller
          name="commodity"
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
              label="Commodity"
              type="text"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="numberOfPackages"
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
              label="Number of packages"
              type="number"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="pickupDate"
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
              label="Pickup date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            // <LocalizationProvider dateAdapter={AdapterMoment}>
            //   <MobileDatePicker
            //     defaultValue={moment().format()}
            //     {...field}
            //     error={!!fieldState?.error}
            //     helperText={fieldState?.error?.message}
            //     variant="outlined"
            //     size="small"
            //     label="Pickup date"
            //   />
            // </LocalizationProvider>
          )}
        />
      </FormControl>
    </Box>
  );
};

export default CommodityForm;
