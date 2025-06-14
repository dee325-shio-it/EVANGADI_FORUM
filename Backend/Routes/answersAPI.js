// import express from "express";
// import { checkLogin } from "../Middleware/middleware.js";
// import {
//   getAnswersForQuestion,
//   postAnswer,

// } from "../Controllers/answerController.js";

// const router = express.Router();

// router.get("/:questionid", checkLogin, getAnswersForQuestion);
// router.post("/", checkLogin, postAnswer);


// export default router;
// answerRoutes.js
import express from "express";
import answerRouter from "../Controllers/answerController.js";

const router = express.Router();

// Mount all answerController routes under /answers path
router.use("/answers", answerRouter);

export default router;