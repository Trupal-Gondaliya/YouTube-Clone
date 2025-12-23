import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).populate("userId", "username avatar");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (req.user.id === comment.userId.toString()) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment deleted.");
    } else {
      res.status(403).json("You can delete only your comment!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};