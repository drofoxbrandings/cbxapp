import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import ShipmentForm from "./Forms/ShipmentForm";
import { useDispatch } from "react-redux";
import { getShipmentStatus } from "./ShipmentApis";
import { useLocation } from "react-router-dom";
const AddShipment = ({ role }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getshipmentStatusList = async () => {
      await dispatch(getShipmentStatus()).unwrap();
    };
    getshipmentStatusList();
  }, []);
  return (
    <Paper
      sx={{
        padding: "1rem",
        margin: "1rem 0",
        maxWidth: "md",
        margin: "1rem auto",
      }}
    >
      <ShipmentForm  role={role} />
    </Paper>
  );
};

export default AddShipment;
