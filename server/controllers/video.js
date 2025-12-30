import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

export const addVideo = async (req, res) => {
  try {
    const newVideo = new Video({ ...req.body, uploader: req.user.id });
    const savedVideo = await newVideo.save();
    await Channel.findByIdAndUpdate(req.body.channelId, {
      $push: { videos: savedVideo._id },
    });
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (req.user.id === video.uploader.toString()) {
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedVideo);
    } else {
      res.status(403).json("You can update only your video!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (req.user.id === video.uploader.toString()) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video deleted.");
    } else {
      res.status(403).json("You can delete only your video!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// For Home Page Grid 
export const getAllVideos = async (req, res) => {
  try {
    // We populate 'uploader' to get the username and avatar for the video card
    const videos = await Video.find()
      .populate("uploader", "username avatar")
      .populate("channelId", "channelName"); // To get the specific Channel Name
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single video by ID
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("uploader", "username avatar")
      .populate("channelId", "channelName subscribers");

    if (!video) return res.status(404).json({ message: "Video not found" });

    video.views += 1;
    await video.save();

    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeVideo = async (req, res) => {
  const userId = req.user.id;
  const videoId = req.params.id;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId }
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const dislikeVideo = async (req, res) => {
  const userId = req.user.id;
  const videoId = req.params.id;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId }
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    res.status(500).json(err);
  }
};