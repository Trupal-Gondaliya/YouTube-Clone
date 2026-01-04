import express from "express";
import { createChannel, getChannel, updateChannel, deleteChannel, subscriberChannel } from "../controllers/channel.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Only signed-in users can create a channel
router.post("/create", verifyToken, createChannel);
router.get("/:id", getChannel);
router.put("/:id", verifyToken, updateChannel);
router.delete("/:id", verifyToken, deleteChannel);
router.put("/subscribe/:id", verifyToken, subscriberChannel)

export default router;