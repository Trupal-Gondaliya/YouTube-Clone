import express from "express";
import { createChannel, getChannel, updateChannel, deleteChannel } from "../controllers/channel.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Only signed-in users can create a channel
router.post("/create", verifyToken, createChannel);
router.get("/:id", getChannel);
router.put("/:id", verifyToken, updateChannel);
router.delete("/:id", verifyToken, deleteChannel);

export default router;