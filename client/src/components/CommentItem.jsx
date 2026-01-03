import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const CommentItem = ({ comment, setComments, comments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(comment.text);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/comments/${comment._id}`);
      setComments(comments.filter((c) => c._id !== comment._id));
    } catch (err) {
      console.log(err);      
     }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/comments/${comment._id}`, { text: editedDesc });
      setIsEditing(false);
      setComments(comments.map(c => c._id === comment._id ? { ...c, text: editedDesc } : c));
    } catch (err) {
      console.log(err);      
     }
  };

  return (
    <div className="flex gap-4 mb-6 group">
      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0">
        {comment.userId?.avatar ? <img src={comment.userId?.avatar} className="rounded-full w-full h-full object-cover" /> : comment.userId?.username?.charAt(0)}
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">@{comment.userId?.username}</span>
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2 mt-2">
            <input
              className="border-b border-blue-500 outline-none w-full"
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
            />
            <div className="flex gap-2">
              <button onClick={handleUpdate} className="text-sm text-blue-600 font-bold hover:text-black">Save</button>
              <button onClick={() => setIsEditing(false)} className="text-sm text-gray-500 hover:text-red-500">Cancel</button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-800">{comment.text}</p>
        )}
      </div>

      {/* Show Edit/Delete only if the user owns the comment */}
      {currentUser?._id === comment.userId?._id && !isEditing && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)}><MdEdit className="text-xl text-gray-500 hover:text-blue-600" /></button>
          <button onClick={handleDelete}><MdDeleteOutline className="text-xl text-gray-500 hover:text-red-600" /></button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;