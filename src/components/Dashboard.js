import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <div className="container d-flex  align-items-center justify-content-center">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser && currentUser.email}
            <Link to="/update-profile" className="btn">
              Update Profile
            </Link>
          </div>
        </div>
        <div className="w-100 text-center mt-2"></div>
      </div>
    </>
  );
}
