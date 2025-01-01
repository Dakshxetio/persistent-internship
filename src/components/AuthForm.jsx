import React, { useState } from "react";
import { Client, Account } from "appwrite";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

// Appwrite Client and Account initialization
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("6773b9f00027544e9ef6"); // Your project ID

const account = new Account(client);

const AuthForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Logging in using email and password
        const response = await account.createEmailPasswordSession(email, password);
        console.log("Login successful:", response); // Log the response for debugging

      } else {
        // Register new user (sign up)
        const response = await account.create("unique()", email, password);
        console.log("Sign-up successful:", response); // Log the response for debugging
      }

      // If successful, set the logged-in status and navigate
      setIsLoggedIn(true);
      navigate("/home");

    } catch (error) {
      console.error("Auth Error:", error); // Log error details for debugging
      alert(error.message); // Display the error message from Appwrite
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleAuth}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Already have an account?"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;

