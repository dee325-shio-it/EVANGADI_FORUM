// Sigin.jsx

import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { baseURL } from "../utils/api";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await baseURL.post("/api/auth/login", formData);
      console.log(response);
      // Ensure the response contains a token
      if (!response.data?.token) {
        throw new Error("No token received");
      }

      // Call login and wait for it to complete
      await login(response.data.token);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <div className="text-center mb-4">
        <h2>Login to your account</h2>
        <p>
          Don't have an account?{" "}
          <NavLink to="/auth?tab=signup" style={{ color: "#f28c38" }}>
            Create a new account
          </NavLink>
        </p>
      </div>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3 position-relative">
          <div className="input-group">
            <input
              type="email"
              className="form-control form-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
          </div>
        </div>

        <div className="mb-3 position-relative">
          <div className="input-group">
            <input
              type="password"
              className="form-control form-input"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div className="form-check"></div>
          <NavLink
            to="/forgot-password"
            className="text-decoration-none auth-link"
            style={{ color: "#f28c38" }}
          >
            Forgot password?
          </NavLink>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 mb-3"
          style={{ backgroundColor: "#5069F0" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
