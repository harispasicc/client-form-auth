import { Form, Card, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./SignIn.css";

export default function SignIn() {
  const { signin, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(email, password);
      navigate("/cc-library");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      {!currentUser && (
        <Card className="login">
          <Card.Body>
            <h2 className="login-body">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="email-box">
                <Form.Control
                  type="email"
                  className="inner-text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value );
                  }}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Control
                  type="password"
                  className="inner-text"
                  placeholder="Password"
                  required
                  value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                />
              </Form.Group>
              <Button className="login-btn" type="submit" disabled={loading}>
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {!currentUser && (
        <div className="login-link">
          <Link to="/forgot-password" className="forgotpwbtn">
            Forgot password?
          </Link>
          <Link to="/signup" className="signupbtn">
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
}
