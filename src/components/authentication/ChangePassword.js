import React, { useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "./ChangePassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { changePassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await changePassword(email);
      setMessage("Check your inbox for further instructions");
      navigate("/cc-library");
    } catch  {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Card className="change-password">
        <Card.Body>
          <h2 className="change-password-body">Change Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <div className="changepw-btns">
              <Button className="change-btn" type="submit" disabled={loading}>
                Change Password
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
