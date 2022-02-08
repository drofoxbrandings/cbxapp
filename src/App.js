import Login from "./components/Auth/Login";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/resetPassword" element={<ResetPassword />} />
          {/* <Route exact path="/addEmployee" component={AddEmployee} /> */}
        </Routes>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
