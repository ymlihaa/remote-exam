import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

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
    <nav
      className="navbar navbar-light "
      style={{
        backgroundColor: "#32be8f",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.18)",
      }}
    >
      <span
        style={{ color: "white", fontWeight: "bold" }}
        className="navbar-brand mb-0 h1 text-center"
      >
        <Link to="/">Remote Trial Exam</Link>
      </span>
      {currentUser && <a onClick={handleLogout}>Logout</a>}
    </nav>
  );
}

export default Header;
