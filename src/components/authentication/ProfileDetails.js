import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./ProfileDetails.css";

export default function ProfileDetails() {
  const { currentUser } = useAuth();

  return (
    <>
      <Card className="profile-details">
        <Card.Body>
          <h2 className="login-body">Profile</h2>
          <strong>Email:</strong> {currentUser?.email}
          <div className="update-logout-btn">
            <Link to="/update-profile" className="btn btn-primary mt-10">
              Update Profile
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
