import express from "express";
import dbConnection from "../Database/database_config.js";
import { checkLogin } from "../Middleware/middleware.js";

const router = express.Router();

/**
 * Edit Question or Answer
 * Authenticated endpoint to edit a question or answer owned by the user
 */
router.put("/:id", checkLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, description, tag, answer } = req.body;
    const userid = req.user.userid;

    if (
      !type ||
      (type === "question" && (!title || !description)) ||
      (type === "answer" && !answer)
    ) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    if (type === "question") {
      const [questions] = await dbConnection
        .promise()
        .execute("SELECT userid FROM questionTable WHERE questionid = ?", [id]);

      if (questions.length === 0) {
        return res.status(404).json({ error: "Question not found" });
      }

      if (questions[0].userid !== userid) {
        return res.status(403).json({ error: "Unauthorized to edit this question" });
      }

      await dbConnection
        .promise()
        .execute(
          "UPDATE questionTable SET title = ?, description = ?, tag = ? WHERE questionid = ?",
          [title, description, tag || null, id]
        );

      res.status(200).json({ message: "Question updated successfully" });
    } else if (type === "answer") {
      const [answers] = await dbConnection
        .promise()
        .execute("SELECT userid FROM answerTable WHERE answerid = ?", [id]);

      if (answers.length === 0) {
        return res.status(404).json({ error: "Answer not found" });
      }

      if (answers[0].userid !== userid) {
        return res.status(403).json({ error: "Unauthorized to edit this answer" });
      }

      await dbConnection
        .promise()
        .execute("UPDATE answerTable SET answer = ? WHERE answerid = ?", [answer, id]);

      res.status(200).json({ message: "Answer updated successfully" });
    } else {
      return res.status(400).json({ error: "Invalid content type" });
    }
  } catch (error) {
    console.error("Edit content error:", error);
    res.status(500).json({ error: "Couldn't edit content" });
  }
});


/**
 * Delete Question or Answer
 * Authenticated endpoint to delete a question or answer owned by the user
 */
router.delete("/:id", checkLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query;
    const userid = req.user.userid;

    if (!type || !["question", "answer"].includes(type)) {
      return res.status(400).json({ error: "Invalid or missing content type" });
    }

    if (type === "question") {
      const [questions] = await dbConnection
        .promise()
        .execute("SELECT userid FROM questionTable WHERE questionid = ?", [id]);

      if (questions.length === 0) {
        return res.status(404).json({ error: "Question not found" });
      }

      if (questions[0].userid !== userid) {
        return res.status(403).json({ error: "Unauthorized to delete this question" });
      }

      await dbConnection
        .promise()
        .execute("DELETE FROM answerTable WHERE questionid = ?", [id]);

      await dbConnection
        .promise()
        .execute("DELETE FROM questionTable WHERE questionid = ?", [id]);

      res.status(200).json({ message: "Question and associated answers deleted successfully" });
    } else {
      const [answers] = await dbConnection
        .promise()
        .execute("SELECT userid FROM answerTable WHERE answerid = ?", [id]);

      if (answers.length === 0) {
        return res.status(404).json({ error: "Answer not found" });
      }

      if (answers[0].userid !== userid) {
        return res.status(403).json({ error: "Unauthorized to delete this answer" });
      }

      await dbConnection
        .promise()
        .execute("DELETE FROM answerTable WHERE answerid = ?", [id]);

      res.status(200).json({ message: "Answer deleted successfully" });
    }
  } catch (error) {
    console.error("Delete content error:", error);
    res.status(500).json({ error: "Couldn't delete content" });
  }
});

export default router;
