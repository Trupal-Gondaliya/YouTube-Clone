import express from "express";
import { toggleWatchLater, getWatchLaterVideos } from "../controllers/watchLater.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:videoId", verifyToken, toggleWatchLater);
router.get("/watchList", verifyToken, getWatchLaterVideos);

export default router;