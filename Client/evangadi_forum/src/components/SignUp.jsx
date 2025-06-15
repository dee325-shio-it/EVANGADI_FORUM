import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { baseURL } from "../utils/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
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

    // Simple client-side validation
    const { username, firstName, lastName, email, password } = formData;
    if (!username || !firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await baseURL.post("/api/auth/register", {
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
    <div className="">
      <div className="text-center mb-4">
        <h2>Join the network</h2>
        <p>
          Already have an account?{" "}
          <NavLink to="/auth?tab=login" style={{ color: "#f28c38" }}>
            Sign in
          </NavLink>
        </p>
      </div>

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

        {/* Name Fields */}
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

        {/* Terms Text */}
        <h6 className="my-3 text-center" style={{ fontSize: "10px" }}>
          I agree to the{" "}
          <NavLink to="#" className="auth-link">
            privacy policy
          </NavLink>{" "}
          and{" "}
          <NavLink to="#" className="auth-link">
            terms of service
          </NavLink>
        </h6>

        <button type="submit" className="btn btn-primary w-100 auth-button">
          Agree and Join
        </button>
        <div className="text-center mb-4">
          <NavLink
            to="/auth?tab=login"
            style={{ textDecoration: "none", color: "#f28c38" }}
          >
            Already have an account?{" "}
          </NavLink>
        </div>
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
