import React, { useState, useEffect } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const { currentUser, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    adress: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const db = getFirestore();
    const docRef = doc(db, "Users", currentUser.uid);
    onSnapshot(docRef, (doc) => {
      let userData = doc.data();
      setUserData(userData);
      console.log(userData);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    setLoading(true);
    setError("");

    if (userData.email) {
      updateEmail(userData.email);
    }

    try {
      const updatedUserData = {
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Email: userData.Email,
        Adress: userData.Adress,
      };

      const db = getFirestore();
      await setDoc(doc(db, "Users", currentUser.uid), updatedUserData);

      navigate("/cc-library");
    } catch (e) {
      alert("Error occurred while updating user.");
    }
    setLoading(false);
  }

  return (
    <>
      <Card id="update-profile-id" className="update-profile">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form id="update-profile-form" onSubmit={handleSubmit}>
            <Form.Group id="first-name">
              <Form.Control
                type="text"
                name="firstName"
                className="inner-text"
                placeholder="First Name"
                name="firstName"
                required
                value={userData.FirstName}
                onChange={(e) => {
                  setUserData({ ...userData, FirstName: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group id="last-name">
              <Form.Control
                type="text"
                name="lastName"
                className="inner-text"
                placeholder="Last Name"
                name="lastName"
                required
                value={userData.LastName}
                onChange={(e) => {
                  setUserData({ ...userData, LastName: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                name="email"
                required
                value={userData.Email}
                onChange={(e) => {
                  setUserData({ ...userData, Email: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group id="adress">
              <Form.Control
                type="text"
                className="inner-text"
                placeholder="Adress"
                name="adress"
                name="adress"
                required
                value={userData.Adress}
                onChange={(e) => {
                  setUserData({ ...userData, Adress: e.target.value });
                }}
              />
            </Form.Group>
            <Button type="submit" className="update-btn" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="update-link">
        <Link to="/cc-library" className="cancel-link">
          Cancel
        </Link>
      </div>
    </>
  );
}
