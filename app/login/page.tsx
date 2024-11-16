"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import './login.css'; // Ensure this path is correct

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Success message state
  const [userData, setUserData] = useState(null); // State to store returned data
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // Reset success message on new submission
    setUserData(null); // Reset user data on new submission

    // Create the form body as URL-encoded
    const formBody = new URLSearchParams({
      grant_type: "password",
      username: username,
      password: password,
      scope: "", // Send empty value
      client_id: "string", // Replace with actual client_id if needed
      client_secret: "string", // Replace with actual client_secret if needed
    });

    try {
      const response = await fetch("http://20.235.195.98/app/api/v0.1/login/user-login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log("Login successful", data);
        setSuccess("Login successful!"); // Set success message
        setUserData(data); // Store returned data

        // Redirect based on user role
        setTimeout(() => {
          setSuccess(""); // Hide the success message
          if (data.user_role === "super-admin") {
            router.push("/superadmin");
          } else if (data.user_role === "org-admin") {
            router.push("/orgadmin");
          } else if (data.user_role === "HeadCoach") {
            router.push("/headcoach");
          } else {
            router.push("/"); // Default redirect
          }
        }, 2000);

        // Store token or handle user state as necessary
      } else {
        // Handle errors
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="block-cube">
      <form onSubmit={handleSubmit} className="form">
        <div className="control">
          <h1>Sign In</h1>
        </div>
        <div className="control block-cube block-input">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <div className="control block-cube block-input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>

        <button type="submit" className="btn block-cube block-cube-hover">
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
          <span className="text">Log In</span>
        </button>
      </form>

      {error && <div className={`error-message ${error ? 'show' : ''}`}>{error}</div>} {/* Error message */}
      {success && <div className={`success-message ${success ? 'show' : ''}`}>{success}</div>} {/* Success message */}
      {userData && (
        <div className="user-data">
          <h2>User Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )} {/* Display returned data */}
    </div>
  );
};

export default Login;