import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// add comment controller
export const addComment = async (req, res) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    // add to DB
    const savedComment = await newComment.save();
    // add comment id reference into video document
    await Video.findByIdAndUpdate(req.body.videoId, {
      $push: { comments: savedComment._id },
    });
    // populate username, avatar and return to fronted
    const populatedComment = await Comment.findById(savedComment._id)
      .populate("userId", "username avatar");
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get comment controller
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

// delete comment controller
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

// update comment controller
export const updateComment = async (req, res) => {
  try {
    // find comment by ID
    const comment = await Comment.findById(req.params.id);
    // update if commet owner and requested user are same
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