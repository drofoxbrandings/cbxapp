import {
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment/moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useSelector } from "react-redux";
import { getShipmentStatusState } from "../ShipmentSlice";

const CommodityForm = ({ showStatusReason, ...props }) => {
  const _rsShipmentStatusList = useSelector(getShipmentStatusState);

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <FormControl fullWidth margin="dense">
        <Controller
          name="shipStatus"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.shipmentStatus?.length > 0
                ? props?.data?.shipmentStatus[0]?.sStatus
                  ? props?.data?.shipmentStatus[0]?.sStatus
                  : ""
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
              label="Shipment Status"
              type="text"
              select
            >
              {_rsShipmentStatusList?.data?.map((statusItem) => (
                <MenuItem
                  key={statusItem._id}
                  value={statusItem.shipmentStatus}
                >
                  {statusItem.shipmentStatus}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </FormControl>
      {!!showStatusReason && (
        <FormControl fullWidth margin="dense">
          <Controller
            name="statusReason"
            control={props.control}
            defaultValue={
              !!props.isEdit
                ? props?.data?.shipmentStatus?.length > 0
                  ? props?.data?.shipmentStatus[0]?.dueTo
                    ? props?.data?.shipmentStatus[0]?.dueTo
                    : ""
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
                label="Reason"
                type="text"
              />
            )}
          />
        </FormControl>
      )}
      <FormControl fullWidth margin="dense">
        <Controller
          name="commodity"
          control={props.control}
          ref={props.ref}
          defaultValue={
            !!props.isEdit
              ? props?.data?.commodity
                ? props.data.commodity
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
          defaultValue={
            !!props.isEdit
              ? props?.data?.numberOfPackages
                ? props?.data?.numberOfPackages
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
          defaultValue={
            props.isEdit
              ? props.data?.pickupDate
                ? moment(props.data.pickupDate, "DD-MM-YYYY")
                : null
              : null
          }
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                {...field}
                format="DD-MM-YYYY"
                label="Pick up date"
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!props.errors.pickupDate,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
        {props.errors.pickupDate && (
          <FormHelperText sx={{ color: "#f44336" }}>
            {props.errors.pickupDate.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="dense">
        <Controller
          name="deliveryDate"
          control={props.control}
          ref={props.ref}
          defaultValue={
            props.isEdit
              ? props.data?.deliveryDate
                ? moment(props.data.deliveryDate, "DD-MM-YYYY")
                : null
              : null
          }
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                {...field}
                format="DD-MM-YYYY"
                label="Expected delivery date"
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!props.errors.deliveryDate,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
        {props.errors.deliveryDate && (
          <FormHelperText sx={{ color: "#f44336" }}>
            {props.errors.deliveryDate.message}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default CommodityForm;
