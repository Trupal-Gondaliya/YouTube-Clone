import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  thumbnailUrl: { type: String, required: true }, 
  videoUrl: { type: String, required: true },
  description: { type: String }, 
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' , required: true }, 
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  views: { type: [String], default: [] }, 
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] }, 
  category: { type: String, required: true }, 
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] 
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);