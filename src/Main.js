import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/auth-context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import TeacherLogin from "./components/TeacherLogin";
import App from "./components/App";
import Optik from "./components/Optik";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";

import "./components/teacher-login.css";

// import Signup from "./Signup";
// import Dashboard from "./Dashboard";
// import ForgotPassword from "./ForgotPassword";
// import UpdateProfile from "./UpdateProfile";

function Main() {
  return (
    <div
      className=" d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/update-profile">
                <UpdateProfile />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/teacher">
                <TeacherLogin />
              </Route>
              <Route path="/exam">
                <App />
              </Route>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default Main;
