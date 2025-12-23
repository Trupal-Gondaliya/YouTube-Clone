import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import videoRoutes from "./routes/video.js";
import channelRoutes from "./routes/channel.js";
import commentRoutes from "./routes/comment.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.use("/auth", authRoutes);
app.use("/videos", videoRoutes);
app.use("/channels", channelRoutes);
app.use("/comments", commentRoutes);

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));