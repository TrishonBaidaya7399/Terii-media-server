import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  updateUser,
  getAllUsers,
  unFollowUser,
} from "../Controllers/UserController.js";

import authMiddleWare from "../MiddleWare/authMiddleWare.js";
const router = express.Router();
// router.get("/", async (req, res) => {
//   res.send("User route");
// });
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser); //for updating something we will write .put
router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, unFollowUser);
export default router;
