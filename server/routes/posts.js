import { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostBySearch,
  getPost,
  commentPost,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get("/search", getPostBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.patch("/:id/commentPost", auth, commentPost);
export default router;
