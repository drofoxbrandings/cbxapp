import React, { lazy, Suspense, useEffect } from "react";
import { getShipmentStatus, getSingleShipment } from "./ShipmentApis";
import { getSingleShipmentState } from "./ShipmentSlice";
import { Paper } from "@mui/material";
import Loader from "../../components/Loader";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EditShipmentForm = lazy(() => import("./Forms/ShipmentForm"));

const EditShipment = () => {
  const location = useLocation();
  const shipmentId = location.state.shipmentId;
  const dispatch = useDispatch();

  useEffect(() => {
    const getshipmentStatusList = async () => {
      await dispatch(getShipmentStatus()).unwrap();
    };
    getshipmentStatusList();
  }, []);

  const getSingleShipmentEdit = async (shipmentId) => {
    await dispatch(getSingleShipment(shipmentId)).unwrap();
  };

  useEffect(() => {
    if (shipmentId) {
      getSingleShipmentEdit(shipmentId);
    }
  }, [shipmentId]);

  const _rsSingleShipmentState = useSelector(getSingleShipmentState);
  useEffect(() => {
    if (_rsSingleShipmentState?.apiStatus === "failed") {
      alert("failed");
    }
  }, [_rsSingleShipmentState]);
  return (
    <Paper
      sx={{
        padding: "1rem",
        margin: "1rem 0",
        maxWidth: "md",
        margin: "1rem auto",
      }}
    >
      <Suspense
        fallback={
          <Loader open={_rsSingleShipmentState?.apiStatus === "pending"} />
        }
      >
        {_rsSingleShipmentState?.data && <EditShipmentForm singleShipmentData={_rsSingleShipmentState?.data} isEdit={true}/>}
      </Suspense>
    </Paper>
  );
};

export default EditShipment;
