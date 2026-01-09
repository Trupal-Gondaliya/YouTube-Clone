import WatchLater from "../models/WatchLater.js";

export const toggleWatchLater = async (req, res) => {
  try {
    const existing = await WatchLater.findOne({ userId: req.user.id, videoId: req.params.videoId });
    if (existing) {
      await WatchLater.findByIdAndDelete(existing._id);
      return res.status(200).json({ message: "Removed from Watch Later", added: false });
    }
    const newItem = new WatchLater({ userId: req.user.id, videoId: req.params.videoId });
    await newItem.save();
    res.status(200).json({ message: "Added to Watch Later", added: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getWatchLaterVideos = async (req, res) => {
  try {
    const list = await WatchLater.find({ userId: req.user.id })
      .populate({
        path: "videoId",
        populate: { path: "channelId", select: "channelName" }
      });
    res.status(200).json(list.map(item => item.videoId));
  } catch (err) {
    res.status(500).json(err);
  }
};