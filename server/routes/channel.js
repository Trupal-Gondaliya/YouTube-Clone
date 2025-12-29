import express from "express";
import { createChannel, getChannel } from "../controllers/channel.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Only signed-in users can create a channel
router.post("/create", verifyToken, createChannel);
router.get("/:id", getChannel);

export default router;