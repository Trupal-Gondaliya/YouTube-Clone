import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const YouTab = () => {
    // state
    const { currentUser } = useSelector(state => state.user);
    const [likedVideos, setLikedVideos] = useState([]);
    const navigate = useNavigate();
    const [watchLater, setWatchLater] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Prevent API call if the user is not logged in
            if (!currentUser) return;
            try {
                // Fetch liked videos from the backend
                const res = await axiosInstance.get("/videos/you");
                setLikedVideos(res.data);
                // Fetch watchLater videos from the backend
                const resWatchLater = await axiosInstance.get("/watchlater/watchList");
                setWatchLater(resWatchLater.data);
            } catch (err) {
                console.error("Error", err);
            }
        };
        fetchData();
    }, []);

    const viewChannelPage = () => {
        if (currentUser?.channels && currentUser.channels.length > 0) {
            // Navigate to the first channel in their list
            navigate(`/channel/${currentUser.channels[0]}`);
        } else {
            alert("You don't have a channel yet. Create one first!");
        }
    }

    return (
        <div className="flex flex-col w-full p-4 md:p-8 dark:text-white">
            {currentUser ? (
                // if user loged in
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-32 h-32 bg-purple-700 rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                            {currentUser.avatar ? (
                                <img
                                    src={currentUser.avatar}
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span>{currentUser.username.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <h1 className="text-4xl font-bold">{currentUser.username}</h1>
                            <p className="text-gray-500">@{currentUser.username?.toLowerCase()} •<span onClick={viewChannelPage}>View Channel </span></p>
                        </div>
                    </div>

                    {/* Liked video playlist */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Liked videos</h2>
                            {/* navigate to all liked video page */}
                            <Link to="/playlist/liked" className="text-blue-500 font-semibold">View all</Link>
                        </div>

                        {likedVideos.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {likedVideos.slice(0,4).map((video) => (
                                    <Link to={`/video/${video._id}`} key={video._id} className="group flex flex-col gap-2">
                                        <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                                            <img src={video.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={video.title} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{video.channelId?.channelName}</p>
                                            <p className="text-xs text-gray-500 mt-1">{video.views.length}views</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No liked videos found.</p>
                        )}
                    </div>

                    {/* Watchlater video playlist */}
                    <div className="mt-1">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Watch later</h2>
                            {/* navigate to all liked video page  */}
                            <Link to="/playlist/watchlater" className="text-blue-500 font-semibold">View all</Link>
                        </div>
                        {watchLater.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {watchLater.slice(0, 4).map(video => (
                                    <Link to={`/video/${video._id}`} key={video._id} className="flex flex-col gap-2">
                                        <img src={video.thumbnailUrl} loading="lazy" className="rounded-xl aspect-video object-cover" />
                                        <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No Watch Later videos found.</p>
                        )}
                    </div>
                </div>
            ) : (
                // Fallback: where user is not loged in
                <div className="flex flex-col items-center justify-center py-32 w-full">
                    <HiOutlineVideoCameraSlash className="text-8xl mb-4 opacity-10" />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-white">Enjoy your favorite videos</h2>
                    <p className="text-gray-500 mt-2 text-center">Sign in to access videos that you’ve liked or saved</p>
                    {/* login button */}
                    <Link to="/login">
                        <button className="mt-3 flex items-center gap-2 text-blue-600 border border-gray-300 px-3 py-1.5 rounded-full hover:bg-blue-100/50 font-medium text-sm">
                            <FaRegCircleUser className="text-xl" /> Sign in
                        </button>
                    </Link>
                </div>
            )
            }
        </div >
    )
}
export default YouTab;