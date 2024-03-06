import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { listShipment } from "../ShipmentApis";
import { useDispatch } from "react-redux";

const FilterShipment = ({ getList, listPayload }) => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    filterField: Yup.string().required("*Required!!"),
    filterVal: Yup.string().required("*Required!!"),
  });
  const { control, ref, handleSubmit, reset, watch, setValue } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const filters = [
    {
      label: "Shipment reference number",
      value: "shipmentRefNo",
    },
    {
      label: "Shipper name",
      value: "shipperName",
    },
  ];

  const watchedValue = watch("filterField");
  const getLabel = (value) => {
    let label = "";
    switch (value) {
      case "shipmentRefNo":
        label = "Enter Shipment Reference No";
        break;
      case "shipperName":
        label = "Enter Shipper Name";
        break;

      default:
        break;
    }
    return label;
  };

  const filterResult = async (values) => {
    const payload = {
      limit: listPayload.limit,
      offset: listPayload.offset,
      filter: values.filterVal,
      field: values.filterField,
    };
    await getList(payload);
  };
  const clearFilter = () => {
    setValue("filterField", "");
    setValue("filterVal", "");
    setRefresh(!refresh);
  };

  useEffect(() => {
    getList(listPayload);
  }, [refresh]);

  return (
    <Box sx={{ marginBottom: "1rem" }}>
      <form onSubmit={handleSubmit(filterResult)}>
        <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="filterField"
                control={control}
                ref={ref}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    size="small"
                    label="Select filter by"
                    error={!!fieldState?.error}
                    helperText={fieldState?.error?.message}
                    select
                  >
                    {filters.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="filterVal"
                control={control}
                ref={ref}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    size="small"
                    label={getLabel(watchedValue)}
                    error={!!fieldState?.error}
                    helperText={fieldState?.error?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <FormControl fullWidth margin="normal">
              <Button variant="contained" type="submit" color="secondary">
                Filter
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <FormControl fullWidth margin="normal">
              <Button
                variant="outlined"
                type="button"
                color="secondary"
                onClick={clearFilter}
              >
                Clear
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FilterShipment;
