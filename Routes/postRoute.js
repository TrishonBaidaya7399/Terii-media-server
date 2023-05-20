import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimeLinePosts,
} from "../Controllers/PostController.js";
const router = express.Router();
// router.get("/", async (req, res) => {
//   res.status(200).json("Post Route");
// });
router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimeLinePosts);

export default router;
