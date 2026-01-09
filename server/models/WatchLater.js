import mongoose from "mongoose";

const WatchLaterSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }
}, { timestamps: true });

export default mongoose.model("WatchLater", WatchLaterSchema);

