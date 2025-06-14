import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="container mt-5 p-5 bg-light rounded shadow">
      <h1 className="mb-4 text-center fw-bold">How Our Forum Works</h1>
      <p className="lead text-center mb-5">
        Join our community, learn from questions, answers, and contribute back!
        Here’s a simple step-by-step guide to get you started.
      </p>

      <ul className="list-group mb-5">
        <li className="list-group-item d-flex align-items-center mb-3 p-3 shadow-sm">
          <i className="bi bi-box-arrow-in-right fs-4 me-3 text-primary"></i>
          <div>
            <strong>Login or Signup</strong> — If you already have an account,{" "}
            <Link style={{textDecoration:"none"}} to="/auth?tab=signin" className="link-primary fw-semibold">
              log in
            </Link>
            . Otherwise,{" "}
            <Link style={{textDecoration:"none"}} to="/auth?tab=signup" className="link-primary fw-semibold">
              sign up
            </Link>{" "}
            in seconds.
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center mb-3 p-3 shadow-sm">
          <i className="bi bi-list-ul fs-4 me-3 text-warning"></i>
          <div>
            <strong>View All Questions</strong> — Once you’re in, you’ll find a
            curated list of questions from the community on the Home page.
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center mb-3 p-3 shadow-sm">
          <i className="bi bi-eye fs-4 me-3 text-info"></i>
          <div>
            <strong>Click Question Title to View</strong> — See all answers,
            vote, or add your own answer directly on the question page.
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center mb-3 p-3 shadow-sm">
          <i className="bi bi-question-circle fs-4 me-3 text-success"></i>
          <div>
            <strong>Ask Your Question</strong> — To start a new thread, click{" "}
            <Link style={{textDecoration:"none"}} to="/" className="badge bg-primary p-2">Ask Question</Link> on the
            Home page. You need to be a registered user.
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center mb-3 p-3 shadow-sm">
          <i className="bi bi-pencil-square fs-4 me-3 text-secondary"></i>
          <div>
            <strong>Edit or Delete</strong> — If you’re the author of a question
            or answer, you can edit or delete it at any time.
          </div>
        </li>
      </ul>

      <div className="alert alert-info p-3 shadow" role="alert">
        <i className="bi bi-lightbulb-fill me-2 text-warning fs-4 align-middle"></i>
        <strong>Tip:</strong> Keep conversations constructive and respectful.
        Your knowledge makes this community great! 🌟
      </div>

      <div className="text-center mt-4">
        <Link style={{textDecoration:"none"}} to="/auth?tab=signup" className="btn btn-primary btn-lg px-4 py-2 shadow">
          Get Started Now
        </Link>
      </div>
    </div>
  );
}

export default About;
