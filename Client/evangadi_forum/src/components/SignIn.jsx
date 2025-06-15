import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { baseURL } from "../utils/api";
// import "./SignIn.css";

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

        <div className="mb-3">
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

        {error && <div className="alert alert-danger">{error}</div>}

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
          className="btn btn-primary w-100"
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
            "Login"
          )}
        </button>
      </form>

      {/* <div className="info-box mt-5 text-center">
        <Link className="about-label" to="/about">
          About
        </Link>
        <h2 className="evangadi-title">Evangadi Networks</h2>
        <p className="info-text">
          No matter what stage of life you are in, whether you're just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p className="info-text">
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <Link
          className="how-it-works-btn btn btn-outline-primary mt-2"
          to="/about"
        >
          HOW IT WORKS
        </Link>
      </div> */}
    </div>
  );
};

export default SignIn;
