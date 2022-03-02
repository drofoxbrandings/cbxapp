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
import React from "react";
import { useSelector } from "react-redux";

const ls = new SecureLS({ encodingType: "aes" })

function App() {
  const state = useSelector((state) => state)
  const isLoggedIn = _.get(state, "AuthReducer.isLoggedIn", "")
  return (
    <Router>
      <main>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path='/dashboard' element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route exact path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/resetPassword" element={<ResetPassword />} />
        </Routes>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
