import Login from "./components/Auth/Login";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import _ from "lodash";
import PrivateRoute from "./PrivateRoute";
import SecureLS from 'secure-ls'
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Shipment from "./components/Shipment/Shipment";
import Webmail from "./components/WebMail/Webmail";
import User from "./components/User/User";
import NavBar from "./components/Dashboard/NavBar/NavBar";
import { Container, Grid } from "@mui/material";
import NavButton from "./components/Dashboard/NavBar/NavButton";
import Profile from "./components/User/Profile";
import ChangePassword from "./components/User/ChangePassword";
import AddShipment from "./components/Shipment/Forms/AddShipment";

const ls = new SecureLS({ encodingType: "aes" })

function App() {
  const isLoggedin = useSelector((state) => state.AuthReducer.isLoggedIn)
  return (
    <Fragment>
      <Router>

        {isLoggedin &&
          <Fragment>
            <NavBar />
            <NavButton />
          </Fragment>
        }
        <main>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path='/dashboard' element={<PrivateRoute isLoggedIn={isLoggedin} />}>
              <Route exact path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route exact path='/shipment' element={<PrivateRoute isLoggedIn={isLoggedin} />}>
              <Route exact path='/shipment' element={<Shipment />} />
            </Route>
            <Route exact path='/shipment/add' element={<PrivateRoute isLoggedIn={isLoggedin} />}>
              <Route exact path='/shipment/add' element={<AddShipment />} />
            </Route>
            <Route exact path='/webmail' element={<PrivateRoute isLoggedIn={isLoggedin} />}>
              <Route exact path='/webmail' element={<Webmail />} />
            </Route>
            <Route exact path='/user' element={<PrivateRoute isLoggedIn={isLoggedin} />}>
              <Route exact path='/user' element={<User />} />
            </Route>
            <Route exact path='/profile' element={<PrivateRoute isLoggedIn={isLoggedin} />}>
              <Route exact path='/profile' element={<Profile />} />
            </Route>
            <Route exact path='/changePassword' element={<PrivateRoute isLoggedIn={isLoggedin} />}>
              <Route exact path='/changePassword' element={<ChangePassword />} />
            </Route>
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route exact path="/resetPassword" element={<ResetPassword />} />
          </Routes>
          <ToastContainer />
        </main>
      </Router>
    </Fragment>
  );
}

export default App;
