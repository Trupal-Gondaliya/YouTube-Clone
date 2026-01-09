import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axiosInstance from '../utils/axiosInstance.js';
import VideoGrid from '../components/VideoGrid.jsx';
import { useOutletContext } from "react-router-dom";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";

const WatchLaterAll = () => {
    const { currentUser } = useSelector(state => state.user);
    const [watchLater, setWatchLater] = useState([]);
    const { isSidebarOpen } = useOutletContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            if (!currentUser) return;
            try {
                const res = await axiosInstance.get("/watchlater/watchList");
                setWatchLater(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);
    return (
        <>
            <div className='flex flex-col w-full min-h-screen top-14'>
                <div className="flex-1 p-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-gray-500 font-medium">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                            Loading WatchLater videos...
                        </div>
                    ) : watchLater.length > 0 ? (
                        <div className={`top-4 grid gap-4 transition-all duration-300
                    ${isSidebarOpen
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                            }`}
                        >
                            {watchLater.map((video) => (
                                <VideoGrid key={video._id} video={video} />
                            ))}
                        </div>
                    ) : (
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

export default WatchLaterAll;