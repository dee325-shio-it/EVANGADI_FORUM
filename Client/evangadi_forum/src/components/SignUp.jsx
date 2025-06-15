import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { baseURL } from "../utils/api";

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
      </form>

      {/* Info Box */}
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

export default SignUp;
