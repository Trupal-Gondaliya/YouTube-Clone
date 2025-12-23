import Channel from "../models/Channel.js";
import User from "../models/User.js";

export const createChannel = async (req, res) => {
    try {
        const newChannel = new Channel({ ...req.body, owner: req.user.id });
        const savedChannel = await newChannel.save();

        // Update user to include this channel ID 
        await User.findByIdAndUpdate(req.user.id, {
            $push: { channels: savedChannel._id }
        });

        res.status(201).json(savedChannel);

    } catch (err) {
        res.status(500).json(err);
    }
};

export const getChannel = async (req, res) => {
  try {
    // We populate 'videos' so we get the full video objects (title, views, etc.) 
    // instead of just an array of IDs.
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "username avatar")
      .populate("videos"); 
      
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json(err);
  }
};