import React, { useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
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
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
      navigate("/");
    } catch  {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="forgot-password">
        <Card.Body>
          <h2 className="forgot-password-body">Password Reset</h2>
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
            <div className="resetpw-btns">
              <Button className="reset-btn" type="submit" disabled={loading}>
                Reset Password
              </Button>
            </div>

            <Link to="/" className="login-link">
              Log In
            </Link>
          </Form>
        </Card.Body>
      </Card>
      <div>
        Need an account?{" "}
        <Link className="forgotpw-signup-link" to="/signup">
          Sign Up
        </Link>
      </div>
    </>
  );
}
