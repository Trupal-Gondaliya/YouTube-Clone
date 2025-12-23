import Video from "../models/Video.js";

export const addVideo = async (req, res) => {
  try {
    const newVideo = new Video({ ...req.body, uploader: req.user.id });
    const savedVideo = await newVideo.save();
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
};;