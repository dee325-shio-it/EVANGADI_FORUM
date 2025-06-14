import express from "express";
import contentRouter from "../Controllers/contentRoutes.js";

const router = express.Router();
router.use("/content", contentRouter); // Mount the content routes

export default router;