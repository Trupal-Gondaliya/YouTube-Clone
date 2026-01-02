import express from "express";
import { addVideo, updateVideo, deleteVideo, getAllVideos, getVideo, likeVideo, dislikeVideo, searchVideos } from "../controllers/video.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { optionalVerifyToken } from "../middleware/optionalVerifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo); // Create
router.put("/:id", verifyToken, updateVideo); // Update 
router.delete("/:id", verifyToken, deleteVideo); // Delete 
router.get("/", getAllVideos); // Read for Home Page 
router.get("/find/:id", optionalVerifyToken, getVideo); //Read video
router.put("/like/:id", verifyToken, likeVideo);
router.put("/dislike/:id", verifyToken, dislikeVideo);
router.get("/search", searchVideos);

export default router;