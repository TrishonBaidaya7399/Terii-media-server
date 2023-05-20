import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";
const router = express.Router();
// router.get("/", async (req, res) => {
//   res.send("Auth Route");
// });
router.post("/register", registerUser); //created pipeline for the server
router.post("/login", loginUser);
export default router;
