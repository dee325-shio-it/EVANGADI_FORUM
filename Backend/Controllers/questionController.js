// ==================== Routes/questionRoutes.js ====================
// import express from "express";
// import { v4 as uuidv4 } from "uuid";
// import dbConnection from "../Database/database_config.js";
// import { checkLogin } from "../Middleware/middleware.js";


// const router = express.Router();


// /**
//  * Get All Questions
//  * Returns list of all questions with username
//  */
// router.get("/api/question", async (req, res) => {
//   try {
//     const [questions] = await dbConnection
//       .promise()
//       .query(
//         "SELECT q.*, u.username FROM questionTable q JOIN userTable u ON q.userid = u.userid"
//       );
//     res.json({ questions });
//   } catch (error) {
//     console.error("Get questions error:", error);
//     res.status(500).json({ error: "Couldn't get questions" });
//   }
// });


// /**
//  * Get Single Question
//  * Returns details for a specific question
//  */
// router.get("/:questionid", async (req, res) => {
//   try {
//     const { questionid } = req.params;
//     const [questions] = await dbConnection
//       .promise()
//       .execute(
//         "SELECT q.*, u.username FROM questionTable q JOIN userTable u ON q.userid = u.userid WHERE q.questionid = ?",
//         [questionid]
//       );

//     if (questions.length === 0) {
//       return res.status(404).json({ error: "Question not found" });
//     }

//     res.json(questions[0]);
//   } catch (error) {
//     console.error("Get question error:", error);
//     res.status(500).json({ error: "Couldn't get question" });
//   }
// });

// /**
//  * Create Question
//  * Authenticated endpoint to post a new question
//  */
// router.post("/", checkLogin, async (req, res) => {
//   try {
//     const { title, description, tag } = req.body;
//     const userid = req.user.userid;
//     const questionid = uuidv4();

//     if (!title || !description) {
//       return res.status(400).json({ error: "Title and description required" });
//     }

//     await dbConnection
//       .promise()
//       .execute(
//         "INSERT INTO questionTable (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
//         [questionid, userid, title, description, tag || null]
//       );

//     res.status(201).json({ message: "Question posted", questionid });
//   } catch (error) {
//     console.error("Post question error:", error);
//     res.status(500).json({ error: "Couldn't post question" });
//   }
// });

// export default router;
// Controllers/questionController.js



import express from "express";
import { v4 as uuidv4 } from "uuid";
import dbConnection from "../Database/database_config.js";
import { checkLogin } from "../Middleware/middleware.js";

const router = express.Router();

// Get all questions
router.get("/", async (req, res) => {
  try {
    const [questions] = await dbConnection
      .promise()
      .query(
        "SELECT q.*, u.username FROM questionTable q JOIN userTable u ON q.userid = u.userid"
      );
    res.json({ questions });
  } catch (error) {
    console.error("Get questions error:", error);
    res.status(500).json({ error: "Couldn't get questions" });
  }
});

// Get single question
router.get("/:questionid", async (req, res) => {
  try {
    const { questionid } = req.params;
    const [questions] = await dbConnection
      .promise()
      .execute(
        "SELECT q.*, u.username FROM questionTable q JOIN userTable u ON q.userid = u.userid WHERE q.questionid = ?",
        [questionid]
      );

    if (questions.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(questions[0]);
  } catch (error) {
    console.error("Get question error:", error);
    res.status(500).json({ error: "Couldn't get question" });
  }
});

// Post new question (protected)
router.post("/", checkLogin, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const userid = req.user.userid;
    const questionid = uuidv4();

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description required" });
    }

    await dbConnection
      .promise()
      .execute(
        "INSERT INTO questionTable (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
        [questionid, userid, title, description, tag || null]
      );

    res.status(201).json({ message: "Question posted", questionid });
  } catch (error) {
    console.error("Post question error:", error);
    res.status(500).json({ error: "Couldn't post question" });
  }
});

export default router;