/**
 * Sign-up component for Evangadi Forum
 * Production Summary: Provides a registration form with validation and API integration per project requirements.
 */
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { baseURL } from "../utils/api"; // Changed from axios
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Renders sign-up form with validation and submits to /api/register
 * @returns {JSX.Element} Sign-up component
 */
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Invalid email format");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await baseURL.post("/api/auth/register", {
        // Changed from axios
        username: formData.username,
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      navigate("/auth?tab=login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div
      className="card p-4 mx-auto border-0 d-flex"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="text-center mb-3">Join the network</h2>
      <p className=" text-center mb-5">
        Already have an acocunt?{" "}
        <NavLink className="auth-link"
          to="/auth?tab=login"
          style={{ color: "#f28c38", textDecoration: "none", }}
        >
          Sign in
        </NavLink>
      </p>
      {/* <h2 className="text-center mb-4">Create Account</h2> */}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Username Field */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-input"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Name Fields - Side by Side on larger screens */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              type="text"
              className="form-control form-input"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-input"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control form-input"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <input
            type="password"
            className="form-control form-input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <h6 className="my-3 text-center" style={{ fontSize: "10px" }}>
          I agree to the{" "}
          <NavLink style={{ color: "#f28c38" }}>privacy policy</NavLink> and{" "}
          <NavLink style={{ color: "#f28c38" }}>terms of services</NavLink>
        </h6>
        <button
          type="submit"
          className="btn btn-primary w-100 auth-button"
          style={{ backgroundColor: "#5069F0", color: "" }}
        >
          Agree and Join
        </button>
      </form>
      <p className="text-center mt-2">
        <NavLink
          to="/auth?tab=login"
          style={{ color: "#f28c38", textDecoration: "none" }}
        >
          Already have an account?
        </NavLink>
      </p>
    </div>
  );
};

export default SignUp;
