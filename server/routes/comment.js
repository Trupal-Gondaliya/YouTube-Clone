import express from "express";
import { addComment, getCommentsByVideo, deleteComment } from "../controllers/comment.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addComment); // Add 
router.get("/:videoId", getCommentsByVideo); // Fetch 
router.delete("/:id", verifyToken, deleteComment); // Delete 

export default router;