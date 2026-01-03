import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import CommentItem from "./CommentItem";

const Comments = ({ videoId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axiosInstance.get(`/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchComments();
    }, [videoId]);

    const handleComment = async () => {
        if (!currentUser) return alert("Please login to comment");
        try {
            const res = await axiosInstance.post("/comments/", { text: newComment, videoId });
            setComments([res.data, ...comments]);
            setNewComment("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="mt-6">
            <h3 className="font-bold mb-4">{comments.length} Comments</h3>
            <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0">
                    {currentUser?.avatar ? <img src={currentUser.avatar} className="rounded-full w-full h-full object-cover" /> : currentUser?.username?.charAt(0)}
                </div>
                <div className="flex flex-col w-full gap-2">
                    <input
                        placeholder="Add a comment..."
                        className="border-b border-gray-300 outline-none focus:border-black py-1 w-full"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 mt-2">
                        <button onClick={() => setNewComment("")} className="px-4 py-2 hover:bg-gray-100 rounded-full font-medium">Cancel</button>
                        <button onClick={handleComment} className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium">Comment</button>
                    </div>
                </div>
            </div>
            {comments.length > 0
                ? comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} setComments={setComments} comments={comments} />
                ))
                : <div>No comments</div>}
        </div>
    );
};

export default Comments;