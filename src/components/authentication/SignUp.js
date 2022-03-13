import React, { useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { getFirestore } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./SignUp.css";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, passwordConfirmation).then((result) => {
        console.log(result.user.uid);
        saveUserData(result.user.uid);
      });
      navigate("/cc-library");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function saveUserData(userUid) {
    console.log(userUid);

    try {
      let userData = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Adress: adress,
      };

      const db = getFirestore();
      await setDoc(doc(db, "Users", userUid), userData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      {!currentUser && (
        <Card className="signup">
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form id="signup-form" onSubmit={handleSubmit}>
              <Form.Group id="first-name">
                <Form.Control
                  type="text"
                  name="firstName"
                  className="inner-text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group id="last-name">
                <Form.Control
                  type="text"
                  name="lastName"
                  className="inner-text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Group>
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
              <Form.Group id="Adress">
                <Form.Control
                  type="text"
                  className="inner-text"
                  placeholder="Adress"
                  name="Adress"
                  required
                  value={adress}
                  onChange={(e) => {
                    setAdress(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Control
                  type="password"
                  className="inner-text"
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group id="password-confirmation">
                <Form.Control
                  type="password"
                  placeholder="Password Confirmation"
                  className="inner-text"
                  name="passwordConfirmation"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => {
                    setPasswordConfirmation(e.target.value);
                  }}
                />
              </Form.Group>
              <Button type="submit" className="signup-btn" disabled={loading}>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {!currentUser && (
        <div className="signup-link">
          Already have an account?
          <Link to="/" className="login-link">
            Log In
          </Link>
        </div>
      )}
    </>
  );
}
