import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import CCLibrary from "./components/pages/CCLibrary";
import AddCCtoLibrary from "./components/pages/AddCCtoLibrary";
import SignUp from "./components/authentication/SignUp";
import SignIn from "./components/authentication/SignIn";
import ForgotPassword from "./components/authentication/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import UpdateProfile from "./components/authentication/UpdateProfile";
import SignOut from "./components/authentication/SignOut";
import ProfileDetails from './components/authentication/ProfileDetails'
import ChangePassword from './components/authentication/ChangePassword'


function App() {
  return (
    <header className="App">
      <div>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/cc-library" element={<CCLibrary />} />
              <Route path="/add-cc-to-library" element={<AddCCtoLibrary />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/profile-details" element={<ProfileDetails />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </header>
  );
}

export default App;
