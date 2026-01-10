import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AllChannel = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userChannels, setUserChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChannels = async () => {
            if (!currentUser?.channels || currentUser.channels.length === 0) {
                setLoading(false);
                return;
            }
            try {
                // Fetch details for all channel in the user's channels array
                const channelData = await Promise.all(
                    currentUser.channels.map(id => 
                        axiosInstance.get(`/channels/${id}`).then(res => res.data)
                    )
                );
                setUserChannels(channelData);
            } catch (err) {
                console.error("Error fetching channels:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChannels();
    }, [currentUser]);

    if (loading) return <div className="p-10 text-center dark:text-white">Loading your channels...</div>;

    return (
        <div className="p-4 md:p-10 min-h-screen bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-2xl font-bold mb-8">Your Channels</h1>

            {userChannels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {userChannels.map((channel) => (
                        <div 
                            key={channel._id}
                            className="flex flex-col items-center p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                        >
                            {/* Channel Avatar */}
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-purple-700 mb-4 shadow-md">
                                {channel.owner?.avatar ? (
                                    <img src={channel.owner.avatar} alt={channel.channelName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl text-white font-bold">
                                        {channel.channelName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Channel Info */}
                            <h2 className="text-lg font-bold truncate w-full text-center">{channel.channelName}</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                {channel.subscribers?.length || 0} subscribers
                            </p>
                            
                            <button  onClick={() => navigate(`/channel/${channel._id}`)}
                                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-colors">
                                View Channel
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 mb-4">You don't have any channels yet.</p>
                    <Link to="/" className="text-blue-600 font-bold hover:underline">
                        Go back to Home
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AllChannel;