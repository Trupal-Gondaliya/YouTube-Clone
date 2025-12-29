import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { TfiDownload } from "react-icons/tfi";
import RecommendedVideoCard from '../components/RecommendedVideoCard.jsx';

const VideoPlayer = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axiosInstance.get(`/videos/find/${id}`);
                setVideo(videoRes.data);

                // Fetch all videos for the sidebar
                const recRes = await axiosInstance.get("/videos/");
                setRecommended(recRes.data.filter(v => v._id !== id));
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    if (!video) return <div className="p-10">Loading...</div>;

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
                       <div className='flex justify-between items-center gap-2'>
                            <div className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {video.uploader?.avatar ? (
                                    <img
                                        src={video.uploader?.avatar}
                                        alt={video.uploader?.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span>{video.uploader?.username?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-md">{video.channelId?.channelName || "Channel Name"}</h3>
                                <p className="text-xs text-gray-500">{video.channelId?.subscribers + " subscribers"}</p>
                            </div>
                        </div>
                        <button className="bg-black text-white px-4 py-2 rounded-full font-medium ml-4 hover:bg-gray-800">
                            Subscribe
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 border-r border-gray-300">
                                <AiOutlineLike className="text-xl" /> {video.likes}
                            </button>
                            <button className="px-4 py-2 hover:bg-gray-200">
                                <AiOutlineDislike className="text-xl" />
                            </button>
                        </div>
                        <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                            <PiShareFatThin className="text-xl" /> Share
                        </button>
                        <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                            <TfiDownload /> Download
                        </button>
                    </div>
                </div>

                {/* 4. Description Box */}
                <div className="bg-gray-100 rounded-xl p-3 mt-4 text-sm hover:bg-red-50 cursor-pointer transition">
                    <div className="font-bold mb-1">{video.views} views</div>
                    <p className="whitespace-pre-wrap">{video.description}</p>
                </div>

                {/* 5. Comment Section */}
                <div className="mt-6">
                    <h2 className="text-lg font-bold mb-4">Comments</h2>
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