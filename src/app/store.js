import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/Authentication/AuthenticationSlice";
import shipmentReducer from "../features/Shipment/ShipmentSlice";

export const store = configureStore({
  reducer: {
    authentication: AuthReducer,
    shipment: shipmentReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});
