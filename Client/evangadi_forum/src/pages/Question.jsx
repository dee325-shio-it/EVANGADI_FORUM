/**
 * Question and Answers page for Evangadi Forum
 * Production Summary: Displays a question's title, description, answers with usernames, allows editing/deleting own content, and posting answers.
 */
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { baseURL } from "../utils/api";
import { useAuth } from "../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Fetches and displays a question and its answers, supports editing/deleting own content and posting answers
 * @returns {JSX.Element} Question and Answers page
 */
const Question = () => {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [editQuestion, setEditQuestion] = useState({
    title: "",
    description: "",
    tag:"",
  });
  const [editAnswer, setEditAnswer] = useState({ answerid: "", answer: "" });
  const [error, setError] = useState("");
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?tab=login");
      return;
    }

    const fetchData = async () => {
      try {
        const [qResponse, aResponse] = await Promise.all([
          baseURL.get("/api/question/" + questionid),
          baseURL.get("/api/answer/" + questionid).catch((err) => {
            if (err.response?.status === 404) {
              return { data: { answers: [] } };
            }
            throw err;
          }),
        ]);
        setQuestion(qResponse.data);
        setAnswers(aResponse.data.answers || []);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate("/auth?tab=login");
        } else {
          setError("Failed to load question or answers");
        }
      }
    };
    fetchData();
  }, [questionid, isAuthenticated, navigate, logout]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) {
      setError("Answer is required");
      return;
    }
    try {
      await baseURL.post("/api/answer", { questionid, answer: newAnswer });
      setNewAnswer("");
      setError("");
      const response = await baseURL
        .get("/api/answer/" + questionid)
        .catch((err) => {
          if (err.response?.status === 404) {
            return { data: { answers: [] } };
          }
          throw err;
        });
      setAnswers(response.data.answers || []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to post answer");
    }
  };

  const handleEditQuestion = async (e) => {
    e.preventDefault();
    if (!editQuestion.title.trim() || !editQuestion.description.trim()) {
      setError("Title and description are required");
      return;
    }
    try {
      await baseURL.put(`/api/content/${questionid}`, {
        type: "question",
        title: editQuestion.title,
        description: editQuestion.description,
      });
      setQuestion({
        ...question,
        title: editQuestion.title,
        description: editQuestion.description,
      });
      setEditQuestion({ title: "", description: "" });
      setError("");
      document
        .getElementById("editQuestionModal")
        .querySelector(".btn-close")
        .click(); // Close modal
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update question");
    }
  };

  const handleEditAnswer = async (e) => {
    e.preventDefault();
    if (!editAnswer.answer.trim()) {
      setError("Answer is required");
      return;
    }
    try {
      await baseURL.put(`/api/content/${editAnswer.answerid}`, {
        type: "answer",
        answer: editAnswer.answer,
      });
      setAnswers(
        answers.map((a) =>
          a.answerid === editAnswer.answerid
            ? { ...a, answer: editAnswer.answer }
            : a
        )
      );
      setEditAnswer({ answerid: "", answer: "" });
      setError("");
      document
        .getElementById("editAnswerModal")
        .querySelector(".btn-close")
        .click(); // Close modal
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update answer");
    }
  };

  const handleDeleteQuestion = async () => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;
    try {
      await baseURL.delete(`/api/content/${questionid}`, {
        params: { type: "question" },
      });
      navigate("/"); // Redirect to home after deletion
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete question");
    }
  };

  const handleDeleteAnswer = async (answerid) => {
    if (!window.confirm("Are you sure you want to delete this answer?")) return;
    try {
      await baseURL.delete(`/api/content/${answerid}`, {
        params: { type: "answer" },
      });
      setAnswers(answers.filter((a) => a.answerid !== answerid));
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete answer");
    }
  };

  if (!question) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Questions
      </Link>
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <small>Posted by {question.username}</small>
      {user?.userid === question.userid && (
        <div className="mb-3">
          <button
            className="btn btn-warning me-2"
            data-bs-toggle="modal"
            data-bs-target="#editQuestionModal"
            onClick={() =>
              setEditQuestion({
                title: question.title,
                description: question.description,
              })
            }
          >
            Edit Question
          </button>
          <button className="btn btn-danger" onClick={handleDeleteQuestion}>
            Delete Question
          </button>
        </div>
      )}
      <h4 className="mt-4">Answers</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {answers.length === 0 ? (
        <p>No answers yet.</p>
      ) : (
        <div className="list-group mb-4">
          {answers.map((answer) => (
            <div key={answer.answerid} className="list-group-item">
              <p>{answer.answer}</p>
              <small>Posted by {answer.username}</small>
              {user?.userid === answer.userid && (
                <div className="mt-2">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editAnswerModal"
                    onClick={() =>
                      setEditAnswer({
                        answerid: answer.answerid,
                        answer: answer.answer,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteAnswer(answer.answerid)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <h5>Post Your Answer</h5>
      <form onSubmit={handleAnswerSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Your answer"
            rows={4}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Post Answer
        </button>
      </form>

      {/* Edit Question Modal */}
      <div
        className="modal fade"
        id="editQuestionModal"
        tabIndex="-1"
        aria-labelledby="editQuestionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editQuestionModalLabel">
                Edit Question
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditQuestion}>
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    value={editQuestion.title}
                    onChange={(e) =>
                      setEditQuestion({
                        ...editQuestion,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="editDescription"
                    value={editQuestion.description}
                    onChange={(e) =>
                      setEditQuestion({
                        ...editQuestion,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Answer Modal */}
      <div
        className="modal fade"
        id="editAnswerModal"
        tabIndex="-1"
        aria-labelledby="editAnswerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editAnswerModalLabel">
                Edit Answer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditAnswer}>
                <div className="mb-3">
                  <label htmlFor="editAnswerText" className="form-label">
                    Answer
                  </label>
                  <textarea
                    className="form-control"
                    id="editAnswerText"
                    value={editAnswer.answer}
                    onChange={(e) =>
                      setEditAnswer({ ...editAnswer, answer: e.target.value })
                    }
                    rows={4}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
