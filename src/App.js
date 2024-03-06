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
import Header from "./components/Header";
import SecureLS from "secure-ls";
import EditShipment from "./features/Shipment/EditShipment";

function App() {
  const user = useSelector(getLoggedInUser);
  const ls = new SecureLS({ encodingType: "aes" });
  const userRole = ls.get("role");
  const isUserLoggedIn =
    useSelector((state) => state.authentication.login.userLoggedIn) || userRole
      ? true
      : false;
  return (
    <>
      {user && !!isUserLoggedIn && <Header />}
      <Container
        sx={{ background: "#e9e9e9", minHeight: "100vh" }}
        maxWidth="100%"
      >
        <Routes>
          <Route exact path="/" element={<Login role={userRole && userRole}/>} />
          <Route
            exact
            path="/forgotPassword"
            element={<SendResetPasswordLink />}
          />
          <Route
            exact
            path="/shipment"
            element={<ShipmentList user={user} role={userRole && userRole} />}
          />
          <Route
            exact
            path="/resetPassword/:userId/:resetToken"
            element={<ResetPassword user={user} role={userRole} />}
          />
          <Route
            exact
            path="/shipment/edit/:shipmentId"
            element={<EditShipment user={user} role={userRole} />}
          />
          <Route
            exact
            path="/shipment/new"
            element={<AddShipment user={user} role={userRole} />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
