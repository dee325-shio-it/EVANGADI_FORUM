import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        {
          email,
        }
      );
      setStatus({ type: "success", message: res.data.message });
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong.";
      setStatus({ type: "error", message: msg });
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send password Reset Link</button>
      </form>
      {status.message && (
        <p style={{ color: status.type === "error" ? "red" : "green" }}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
