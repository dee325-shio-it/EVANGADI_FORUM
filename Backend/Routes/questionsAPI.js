// routes/question.js

import express from "express";
import { checkLogin } from "../Middleware/middleware.js";
import {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
} from "../Controllers/questionController.js";

const router = express.Router();

// Get all questions
router.get("/", getAllQuestions);

// Get single question by ID
router.get("/:questionid", getSingleQuestion);

// Post a new question (protected)
router.post("/", checkLogin, postQuestion);

export default router;