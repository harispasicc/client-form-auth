import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./SignOut.css";

export default function SignOut() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  let navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <> 
    <Container className="signout">
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="update-logout-btn">
            <Button
              type="button"
              className="signout-btn"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
          </Container>
    </>
  );
}
