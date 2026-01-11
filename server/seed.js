import mongoose from "mongoose";
import Video from "./models/Video.js"; // Adjust paths to your models
import { videos } from "./data/sampleData.js"; // Your sample data 
import User from "./models/User.js"; // Adjust paths to your models
import { users } from "./data/sampleData.js"; // Your sample data 
import Channel from "./models/Channel.js"; // Adjust paths to your models
import { channels } from "./data/sampleData.js"; // Your sample data 
import Comment from "./models/Comment.js"; // Adjust paths to your models
import { comments } from "./data/sampleData.js"; // Your sample data 
import WatchLater from "./models/WatchLater.js"; // Adjust paths to your models
import { watchLater } from "./data/sampleData.js"; // Your sample data 

const seedDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/youtubeClone");

    // Clear everything
    await User.deleteMany({});
    await Channel.deleteMany({});
    await Video.deleteMany({});
    await Comment.deleteMany({});
    await WatchLater.deleteMany({});

    // Insert everything
    await User.insertMany(users);
    await Channel.insertMany(channels);
    await Video.insertMany(videos);
    await Comment.insertMany(comments);
    await WatchLater.insertMany(watchLater);

    console.log("Full Database Seeded Successfully!");
    process.exit();
  } catch (err) { 
    console.log(err);
   }
};

seedDB();