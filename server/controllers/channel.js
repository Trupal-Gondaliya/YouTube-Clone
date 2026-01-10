import Channel from "../models/Channel.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

// createChannel controller
export const createChannel = async (req, res) => {
  try {
    const newChannel = new Channel({ ...req.body, owner: req.user.id });
    // sace channel to DB
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

// get channel controller
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

// update channel data controller
export const updateChannel = async (req, res) => {
  try {
    // find channel by id
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json("Channel not found");

    const updateData = {};
    if (req.body.channelName !== undefined) updateData.channelName = req.body.channelName;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.channelBanner !== undefined) updateData.channelBanner = req.body.channelBanner;

    // 1. Update Channel Details
    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    // 2. Update User Avatar
    if (req.body.avatar !== undefined) {
      await User.findByIdAndUpdate(req.user.id, {
        $set: { avatar: req.body.avatar },
      });
    }

    res.status(200).json(updatedChannel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delere channel controller
export const deleteChannel = async (req, res) => {
  try {
    // find channel by ID
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json("Channel not found");

    if (req.user.id !== channel.owner.toString()) {
      return res.status(403).json("You can only delete your own channel!");
    }

    // 1. Remove Videos from the Video model
    await Video.deleteMany({ channelId: req.params.id });

    // 2. Remove the channel reference from the User model
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { channels: req.params.id }
    });

    // 3. Delete the channel
    await Channel.findByIdAndDelete(req.params.id);

    res.status(200).json("Channel deleted successfully.");
  } catch (err) {
    res.status(500).json(err);
  }
};

// subscribe functionality controller
export const subscriberChannel = async (req, res) => {
  const userId = req.user.id; //get user id
  const channelId = req.params.id; //get channel id
  try {
    // find channel by ID
    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json("Channel not found");

    // if channel already subscribed
    if (channel.subscribers.includes(userId)) {
      await Channel.findByIdAndUpdate(channelId, { 
        $pull: { subscribers: userId }
      });
      res.status(200).json("Unsubscribed successfully");
    } else {
      // subscribe channel
      await Channel.findByIdAndUpdate(channelId, {
        $addToSet: {subscribers : userId}
      });
      res.status(200).json("Subscribed successfully")
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// subscriber list controller
export const subscribeChannelList = async (req, res) => {
  try {
    const channels = await Channel.find({
      subscribers: req.params.id,
    }).select("channelName channelBanner owner");
    
    const populatedChannels = await Channel.find({
        subscribers: req.params.id,
      }).populate("owner", "avatar username");
    
    res.status(200).json(populatedChannels);
  } catch (err) {
    res.status(500).json(err);
  }
}