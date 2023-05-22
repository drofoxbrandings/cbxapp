import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getLoggedInUser } from "./features/Authentication/AuthenticationSlice";
import Login from "./features/Authentication/Login";
import ResetPassword from "./features/Authentication/ResetPassword";
import SendResetPasswordLink from "./features/Authentication/SendResetPasswordLink";
import AddShipment from "./features/Shipment/AddShipment";
import ShipmentList from "./features/Shipment/ShipmentList";

function App() {
  const user = useSelector(getLoggedInUser);
  return (
    <Container
      maxWidth="false"
      sx={{ background: "#e9e9e9", minHeight: "100vh" }}
    >
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/forgotPassword"
          element={<SendResetPasswordLink />}
        />
        <Route exact path="/shipment" element={<ShipmentList user={user} />} />
        <Route
          exact
          path="/resetPassword/:userId/:resetToken"
          element={<ResetPassword user={user} />}
        />
        <Route
          exact
          path="/shipment/new"
          element={<AddShipment user={user} />}
        />
      </Routes>
    </Container>
  );
}

export default App;
