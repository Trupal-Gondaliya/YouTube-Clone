import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    const savedComment = await newComment.save();
    await Video.findByIdAndUpdate(req.body.videoId, {
      $push: { comments: savedComment._id },
    });
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
    .populate("userId", "username avatar")
    .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json("Comment not found");
    
    if (req.user.id === comment.userId.toString()) {
      // 1. Remove the comment reference from the Video document
      await Video.findByIdAndUpdate(comment.videoId, {
        $pull: { comments: req.params.id },
      });

      // 2. Delete the actual comment
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment deleted.");
    } else {
      res.status(403).json("You can delete only your comment!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (req.user.id === comment.userId.toString()) {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        { $set: { text: req.body.text } },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } else {
      res.status(403).json("You can update only your comment!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};