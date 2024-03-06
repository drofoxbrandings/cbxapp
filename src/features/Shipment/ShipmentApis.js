import { createAsyncThunk } from "@reduxjs/toolkit";
import { cbxAxios } from "../../app/axios";

//list shipment
export const listShipment = createAsyncThunk(
  "shipment/listShipment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.get(
        `/shipment/listShipment?limit=${data.limit}&offset=${data.offset}&filter=${data.filter}&field=${data.field}`
      );
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

//get status
export const getShipmentStatus = createAsyncThunk(
  "shipment/getShipmentStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.get(`/shipment/status/listStatus`);
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

// discard shipment
export const discardShipment = createAsyncThunk(
  "shipment/discardShipment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.put(`/shipment/discardShipment/${payload}`);
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

// activate shipment
export const activateShipment = createAsyncThunk(
  "shipment/activateShipment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.put(`/shipment/activateShipment/${payload}`);
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

// delete shipment
export const deleteShipment = createAsyncThunk(
  "shipment/deleteShipment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.post(`/shipment/deleteShipment/${payload}`);
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
// add shipment
export const addNewShipment = createAsyncThunk(
  "shipment/addNewShipment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.post(`/shipment/addShipment`, payload);
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
// edit shipment - get shipment data
export const getSingleShipment = createAsyncThunk(
  "shipment/getSingleShipment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.get(`/shipment/getShipment/${payload}`);
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

// add shipment
export const updateShipment = createAsyncThunk(
  "shipment/updateShipment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await cbxAxios.put(
        `/shipment/updateShipment/${payload?.id}`,
        payload?.data
      );
      return res;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
