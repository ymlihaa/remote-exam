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

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser && currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-primary"
        >
          Log Out
        </button>
      </div>
    </>
  );
}
