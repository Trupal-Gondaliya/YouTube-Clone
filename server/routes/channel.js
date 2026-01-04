import express from "express";
import { createChannel, getChannel, updateChannel, deleteChannel, subscriberChannel, subscribeChannelList } from "../controllers/channel.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Only signed-in users can create a channel
router.post("/create", verifyToken, createChannel);
router.get("/:id", getChannel);
router.put("/:id", verifyToken, updateChannel);
router.delete("/:id", verifyToken, deleteChannel);
router.put("/subscribe/:id", verifyToken, subscriberChannel)
router.get("/subscriptions/:id", verifyToken, subscribeChannelList)
export default router;