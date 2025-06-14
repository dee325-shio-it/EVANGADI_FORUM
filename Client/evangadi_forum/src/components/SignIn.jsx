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

      const loginSuccess = await login(response.data.token);
      if (loginSuccess) {
        navigate("/", { replace: true });
      } else {
        setError("Authentication failed. Please try again.");
      }
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
    <div className="sign_in_sign_up_background signin-container">
      <div className="signin-box">
        <div className="text-center mb-4">
          <h2 className="text-center mb-3">Login to your account</h2>
          <p className="text-center mb-4">
            Don't have an account?{" "}
            <NavLink className="auth-link" to="/auth?tab=signup">
              Create a new account
            </NavLink>
          </p>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="d-flex justify-content-end mb-3">
            <NavLink
              to="/forgot-password"
              className="text-decoration-none auth-link"
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
      </div>

      <div className="info-box">
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
        <Link button className="how-it-works-btn" to="/about">
          HOW IT WORKS
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
