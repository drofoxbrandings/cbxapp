import { createSlice } from "@reduxjs/toolkit";
import {
  activateShipment,
  deleteShipment,
  discardShipment,
  getShipmentStatus,
  listShipment,
} from "./ShipmentApis";

const initialState = {
  shipmentList: {
    apiStatus: "idle",
    statusCode: null,
    error: false,
    message: "",
    data: [],
    count: 0
  },
  statusList: {
    apiStatus: "idle",
    statusCode: null,
    error: false,
    message: "",
    data: [],
  },
  discardShipment: {
    apiStatus: "idle",
    statusCode: null,
    error: false,
    message: "",
    data: [],
  },
  activateShipment: {
    apiStatus: "idle",
    statusCode: null,
    error: false,
    message: "",
    data: [],
  },
  deleteShipment: {
    apiStatus: "idle",
    statusCode: null,
    error: false,
    message: "",
    data: [],
  },
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(listShipment.pending, (state) => {
        state.shipmentList.apiStatus = "pending";
      })
      .addCase(listShipment.rejected, (state, action) => {
        state.shipmentList.apiStatus = "failed";
        state.shipmentList.statusCode = action.payload.status;
        state.shipmentList.error = true;
        state.shipmentList.message = action.payload.data.message;
        state.shipmentList.data = [];
      })
      .addCase(listShipment.fulfilled, (state, action) => {
        state.shipmentList.apiStatus = "success";
        state.shipmentList.statusCode = action.payload.status;
        state.shipmentList.error = false;
        state.shipmentList.message = "";
        state.shipmentList.data = action.payload.data.data;
        state.shipmentList.count = action.payload.data.totalRows;
      })
      .addCase(getShipmentStatus.pending, (state) => {
        state.statusList.apiStatus = "pending";
      })
      .addCase(getShipmentStatus.rejected, (state, action) => {
        state.statusList.apiStatus = "failed";
        state.statusList.statusCode = action.payload.status;
        state.statusList.error = true;
        state.statusList.message = action.payload.data.message;
        state.statusList.data = [];
      })
      .addCase(getShipmentStatus.fulfilled, (state, action) => {
        state.statusList.apiStatus = "success";
        state.statusList.statusCode = action.payload.status;
        state.statusList.error = false;
        state.statusList.message = "";
        state.statusList.data = action.payload.data;
      })
      .addCase(discardShipment.pending, (state) => {
        state.discardShipment.apiStatus = "pending";
      })
      .addCase(discardShipment.rejected, (state, action) => {
        state.discardShipment.apiStatus = "failed";
        state.discardShipment.statusCode = action.payload.status;
        state.discardShipment.error = true;
        state.discardShipment.message = action.payload.data.message;
        state.discardShipment.data = [];
      })
      .addCase(discardShipment.fulfilled, (state, action) => {
        state.discardShipment.apiStatus = "success";
        state.discardShipment.statusCode = action.payload.status;
        state.discardShipment.error = false;
        state.discardShipment.message = "";
        state.discardShipment.data = action.payload.data.message;
      })
      .addCase(activateShipment.pending, (state) => {
        state.activateShipment.apiStatus = "pending";
      })
      .addCase(activateShipment.rejected, (state, action) => {
        state.activateShipment.apiStatus = "failed";
        state.activateShipment.statusCode = action.payload.status;
        state.activateShipment.error = true;
        state.activateShipment.message = action.payload.data.message;
        state.activateShipment.data = [];
      })
      .addCase(activateShipment.fulfilled, (state, action) => {
        state.activateShipment.apiStatus = "success";
        state.activateShipment.statusCode = action.payload.status;
        state.activateShipment.error = false;
        state.activateShipment.message = "";
        state.activateShipment.data = action.payload.data.message;
      })
      .addCase(deleteShipment.pending, (state) => {
        state.deleteShipment.apiStatus = "pending";
      })
      .addCase(deleteShipment.rejected, (state, action) => {
        state.deleteShipment.apiStatus = "failed";
        state.deleteShipment.statusCode = action.payload.status;
        state.deleteShipment.error = true;
        state.deleteShipment.message = action.payload.data.message;
        state.deleteShipment.data = [];
      })
      .addCase(deleteShipment.fulfilled, (state, action) => {
        state.deleteShipment.apiStatus = "success";
        state.deleteShipment.statusCode = action.payload.status;
        state.deleteShipment.error = false;
        state.deleteShipment.message = "";
        state.deleteShipment.data = action.payload.data.message;
      });
  },
});

export const getShipmentState = (state) => state.shipment.shipmentList;
export const getShipmentStatusState = (state) => state.shipment.statusList;
export const getDiscardShipmentState = (state) =>
  state.shipment.discardShipment;
export const getActivateShipmentState = (state) =>
  state.shipment.activateShipment;
export const getDeleteShipmentState = (state) => state.shipment.deleteShipment;

export default shipmentSlice.reducer;
