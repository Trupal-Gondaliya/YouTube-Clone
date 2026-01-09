import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { TfiDownload } from "react-icons/tfi";
import RecommendedVideoCard from '../components/RecommendedVideoCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import Comments from './Comments.jsx';
import { updateUserSuccess } from '../redux/userSlice.js';
import { IoSaveOutline, IoSaveSharp } from "react-icons/io5";
import { toast, Toaster } from 'react-hot-toast';

const VideoPlayer = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isExpandedDesc, setIsExpandedDesc] = useState(false);
    const [watchLater, setWatchLater] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axiosInstance.get(`/videos/find/${id}`);
                setVideo(videoRes.data);

                // Fetch all videos for the sidebar
                const recRes = await axiosInstance.get("/videos/");
                setRecommended(recRes.data.filter(v => v._id !== id));

                // Fetch Watch later videos
                const resWatchLater = await axiosInstance.get("/watchlater/watchList");
                setWatchLater(resWatchLater.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    if (!video) return <div className="p-10">Loading...</div>;

    const handelLike = async () => {
        if (!currentUser) return alert("Please login to like videos!!");
        try {
            await axiosInstance.put(`/videos/like/${id}`);
            setVideo((prev) => {
                const isLiked = prev.likes.includes(currentUser._id);
                return {
                    ...prev,
                    // If already liked, remove it; else add it
                    likes: isLiked
                        ? prev.likes.filter((id) => id !== currentUser._id)
                        : [...prev.likes, currentUser._id],
                    // Always remove from dislikes if liking
                    dislikes: prev.dislikes.filter((id) => id !== currentUser._id),
                };
            });
        } catch (err) {
            console.error("Error liking video", err);
        }
    }

    const handelDislike = async () => {
        if (!currentUser) return alert("Please login to dislike videos!!");
        try {
            await axiosInstance.put(`/videos/dislike/${id}`);
            setVideo((prev) => {
                const isDislike = prev.dislikes.includes(currentUser._id);
                return {
                    ...prev,
                    dislikes: isDislike
                        ? prev.dislikes.filter((id) => id != currentUser._id)
                        : [...prev.dislikes, currentUser._id],
                    likes: prev.likes.filter((id) => id != currentUser._id),
                };
            });
        } catch (err) {
            console.error("Error disliking video", err);
        }
    }

    const handelSubscribe = async () => {
        if (!currentUser) return alert("Please login to subscribe to the channel!!");
        const targetChannelId = video.channelId?._id || video.channelId;
        try {
            await axiosInstance.put(`/channels/subscribe/${targetChannelId}`);
            setVideo((prev) => {
                const currentSubscribers = prev.channelId?.subscribers || [];
                const isSubscribed = currentSubscribers.includes(currentUser._id);
                return {
                    ...prev,
                    channelId: {
                        ...prev.channelId,
                        subscribers: isSubscribed
                            ? currentSubscribers.filter((id) => id !== currentUser._id)
                            : [...currentSubscribers, currentUser._id]
                    }
                };
            });
            const isCurrentlySubscribed = currentUser.subscribedUsers?.includes(targetChannelId);

            const updatedList = isCurrentlySubscribed
                ? currentUser.subscribedUsers.filter(id => id !== targetChannelId)
                : [...(currentUser.subscribedUsers || []), targetChannelId];

            dispatch(updateUserSuccess({ subscribedUsers: updatedList }));
        } catch (err) {
            console.error("Error Subscribing Channel", err);
        }
    }

    const descriptionLimit = 200;
    const isLongDescription = video.description?.length > descriptionLimit;

    const displayText = isExpandedDesc
        ? video.description
        : video.description?.slice(0, descriptionLimit);

    const handleWatchLater = async () => {
        if (!currentUser) return alert("Please login first!");
        try {
            const res = await axiosInstance.post(`/watchlater/${video._id}`);
            // 2. MANUALLY update the local state to trigger a re-render
            setWatchLater((prevList) => {
                const isAdded = prevList.some(item => item._id === video._id);

                if (isAdded) {
                    // If it was already there, remove it
                    return prevList.filter(item => item._id !== video._id);
                } else {
                    // If it wasn't there, add the current video object
                    return [...prevList, video];
                }
            });
            toast.success(res.data.message, {
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:px-12 min-h-screen">
            {/* LEFT SIDE: Video & Details */}
            <div className="flex-2">
                {/* 1. Video Player */}
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                    <video
                        src={video.videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full"
                    />
                </div>

                {/* 2. Title */}
                <h1 className="text-xl font-bold mt-4 line-clamp-2">{video.title}</h1>

                {/* 3. Channel Info & Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
                    <div className="flex items-center gap-3">
                        <Link to={`/channel/${video.channelId?._id || video.channelId}`}>
                            <div className='flex justify-between items-center gap-2'>
                                <div className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {video.uploader?.avatar ? (
                                        <img
                                            src={video.uploader?.avatar}
                                            alt={video.uploader?.username}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <span>{video.uploader?.username?.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-md">{video.channelId?.channelName || "Channel Name"}</h3>
                                    <p className="text-xs text-gray-500 dark:font-bold">{video.channelId?.subscribers.length + " subscribers"}</p>
                                </div>
                            </div>
                        </Link>
                        <button onClick={handelSubscribe}
                            className={`${video.channelId?.subscribers?.includes(currentUser?._id)
                                ? "bg-gray-200 text-black"
                                : "bg-black text-white"
                                } px-4 py-2 rounded-full font-medium ml-4 hover:opacity-80 transition`}>
                            {video.channelId?.subscribers?.includes(currentUser?._id)
                                ? "Subscribed"
                                : "Subscribe"}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden dark:bg-neutral-800">
                            <button onClick={handelLike} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 border-r border-gray-300 dark:hover:bg-neutral-700">
                                {video.likes.includes(currentUser?._id) ? (
                                    <AiFillLike className="text-xl text-blue-600" />
                                ) : (
                                    <AiOutlineLike className="text-xl" />
                                )}
                                {video.likes?.length}
                            </button>
                            <button onClick={handelDislike} className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700">
                                {video.dislikes.includes(currentUser?._id) ? (
                                    <AiFillDislike className='text-xl text-blue-600' />
                                ) : (
                                    <AiOutlineDislike className="text-xl" />
                                )}
                            </button>
                        </div>
                        <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                            <PiShareFatThin className="text-xl" /> Share
                        </button>
                        <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                            <TfiDownload /> Download
                        </button>
                        <button
                            onClick={handleWatchLater}
                            className="bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                            {watchLater.some(item => item._id === video._id) ? (
                                <IoSaveSharp className="text-2xl" />
                            ) : (
                                <IoSaveOutline className="text-2xl" />
                            )}
                            <Toaster position="bottom-left" />
                        </button>
                    </div>
                </div>

                {/* 4. Description Box */}
                <div className="bg-gray-100 rounded-xl p-3 mt-4 text-sm hover:bg-red-50 cursor-pointer transition dark:bg-neutral-800 dark:hover:bg-neutral-700">
                    <div className="flex gap-2 text-sm font-bold mb-1">
                        <span>{video.views?.length} views</span>
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm text-gray-800 dark:text-white">
                        {displayText}
                        {isLongDescription && !isExpandedDesc && "..."}
                    </p>
                    {isLongDescription && (
                        <button
                            onClick={() => setIsExpandedDesc(!isExpandedDesc)}
                            className="text-sm font-bold mt-2 cursor-pointer hover:text-gray-600"
                        >
                            {isExpandedDesc ? "Show less" : "...more"}
                        </button>
                    )}
                </div>

                {/* 5. Comment Section */}
                <div className="mt-6">
                    {/* <h2 className="text-lg font-bold mb-4">Comments</h2> */}
                    <Comments videoId={video._id} />
                </div>
            </div>

            {/* RIGHT SIDE: Recommended Videos */}
            <div className="flex-1 flex flex-col gap-3">
                {recommended.map(item => (
                    <RecommendedVideoCard key={item._id} video={item} />
                ))}
            </div>
        </div>
    );
};

export default VideoPlayer;