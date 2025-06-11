import express from "express";
import { checkSignUp, checkLogin } from "../Middleware/middleware.js";
import { makeToken } from "../TokenGenerator/JWT.js";
import dbConnection from "../Database/database_config.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
router.get("/checkUser", checkLogin, async (req, res) => {
  try {
    console.log("Fetching user for userid:", req.user.userid);
    const [users] = await dbConnection
      .promise()
      .execute(
        "SELECT userid, firstname, username, email FROM userTable WHERE userid = ?",
        [req.user.userid]
      );
    console.log("User query result:", users);
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(users[0]);
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});
