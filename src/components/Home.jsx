import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite";

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    // Check if the user has an active session
    const checkSession = async () => {
      try {
        const session = await account.getSession("current");
        setIsSessionActive(!!session); // Set session active flag if a session exists
      } catch (error) {
        console.log("No active session found:", error.message);
        setIsSessionActive(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      if (isSessionActive) {
        // Delete the current session only if an active session exists
        await account.deleteSession("current");
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login page after logout
      } else {
        console.log("No session to delete.");
        setIsLoggedIn(false); // If there's no session, still update the state and navigate to login
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to the Home Page!</h1>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginTop: "1rem",
          backgroundColor: "#1a1a1a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
