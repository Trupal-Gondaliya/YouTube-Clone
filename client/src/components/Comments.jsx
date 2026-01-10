// import all required file
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import CommentItem from "./CommentItem";

const Comments = ({ videoId }) => {
    const { currentUser } = useSelector((state) => state.user); //current user info
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // fetch all comments from api
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

    // add new comment
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
            {/* Display the total number of comments dynamically */}
            <h3 className="font-bold mb-4">{comments.length} Comments</h3>

            {/* Input Section: User Avatar and Comment Box */}
            <div className="flex gap-4 mb-8">
                {/* User Profile Picture or Initial Placeholder */}
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0">
                    {currentUser?.avatar ? (
                        <img src={currentUser.avatar} loading="lazy" className="rounded-full w-full h-full object-cover" />
                    ) : (
                        // Fallback: Display the first letter of the username if no avatar exists
                        currentUser?.username?.charAt(0)
                    )}
                </div>
                {/* Comment Input and Action Buttons */}
                <div className="flex flex-col w-full gap-2">
                    <input
                        placeholder="Add a comment..."
                        className="border-b border-gray-300 outline-none focus:border-black py-1 w-full"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 mt-2">
                        {/* Clear the input field when 'Cancel' is clicked */}
                        <button onClick={() => setNewComment("")} className="px-4 py-2 hover:bg-gray-100 rounded-full font-medium dark:hover:bg-neutral-700">Cancel</button>
                        {/* Trigger the function to post the comment */}
                        <button onClick={handleComment} className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium">Comment</button>
                    </div>
                </div>
            </div>
            {/* Comments List Section */}
            {comments.length > 0
                ? comments.map((comment) => (
                    /* Render individual comment items; passing state setters to allow for updates/deletes */
                    <CommentItem key={comment._id} comment={comment} setComments={setComments} comments={comments} />
                ))
                : /* Fallback display when the comment array is empty */
                <div>No comments</div>}
        </div>
    );
};

export default Comments;