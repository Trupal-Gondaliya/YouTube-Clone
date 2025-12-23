import express from "express";
import { addVideo, updateVideo, deleteVideo, getAllVideos } from "../controllers/video.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo); // Create
router.put("/:id", verifyToken, updateVideo); // Update 
router.delete("/:id", verifyToken, deleteVideo); // Delete 
router.get("/", getAllVideos); // Read for Home Page 
export default router;