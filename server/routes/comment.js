import express from "express";
import { addComment, getCommentsByVideo, deleteComment, updateComment } from "../controllers/comment.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addComment); // Add 
router.get("/:videoId", getCommentsByVideo); // Fetch 
router.delete("/:id", verifyToken, deleteComment); // Delete 
router.put("/:id", verifyToken, updateComment) //Update

export default router;