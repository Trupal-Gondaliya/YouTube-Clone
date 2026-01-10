import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axiosInstance from '../utils/axiosInstance.js';
import VideoGrid from '../components/VideoGrid.jsx';
import { useOutletContext } from "react-router-dom";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";

const LikesVideoAll = () => {
    // State
    const { currentUser } = useSelector(state => state.user);
    const [likedVideos, setLikedVideos] = useState([]);
    const { isSidebarOpen } = useOutletContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            // Prevent API call if the user is not logged in
            if (!currentUser) return;
            try {
                // Fetch liked videos from the backend
                const res = await axiosInstance.get("/videos/you");
                setLikedVideos(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                // Turn off loading spinner regardless of success or failure
                setLoading(false);
            }
        };
        fetchVideos();
    }, [currentUser]); // Re-run if the user logs in/out
    return (
        <>
            <div className='flex flex-col w-full min-h-screen top-14'>
                <div className="flex-1 p-4">
                    {/* 1. Loading State: Display a spinner while fetching data */}
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-gray-500 font-medium">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                            Loading Liked videos...
                        </div>
                    ) : likedVideos.length > 0 ? (
                        // 2. Success State: Display the grid.
                        <div className={`top-4 grid gap-4 transition-all duration-300
                    ${isSidebarOpen
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                            }`}
                        >
                            {likedVideos.map((video) => (
                                <VideoGrid key={video._id} video={video} />
                            ))}
                        </div>
                    ) : (
                        // 3. Empty State: Display an icon and message if no videos are liked
                        <div className="flex flex-col items-center justify-center py-32 text-gray-400 w-full">
                            <HiOutlineVideoCameraSlash className="text-8xl mb-4 opacity-10" />
                            <h2 className="text-2xl font-bold text-gray-700 dark:text-white">No videos found</h2>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default LikesVideoAll;