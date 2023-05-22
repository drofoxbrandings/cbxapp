import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import ShipmentForm from "./Forms/ShipmentForm";
import { useDispatch, useSelector } from "react-redux";
import { getShipmentStatus } from "./ShipmentApis";
import { getShipmentStatusState } from "./ShipmentSlice";

const AddShipment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getshipmentList = async () => {
      await dispatch(getShipmentStatus()).unwrap();
    };
    getshipmentList();
  }, []);

  const _rsShipmentStatusList = useSelector(getShipmentStatusState);

  return (
    <Paper
      sx={{
        padding: "1rem",
        margin: "1rem 0",
        maxWidth: "md",
        margin: "1rem auto",
      }}
    >
      <ShipmentForm status={_rsShipmentStatusList?.data} />
    </Paper>
  );
};

export default AddShipment;
