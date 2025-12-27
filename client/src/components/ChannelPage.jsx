import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import VideoGrid from './VideoGrid';

const ChannelPage = () => {
    const { id } = useParams();
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const res = await axiosInstance.get(`/channels/${id}`);
                setChannel(res.data);
            } catch (err) {
                console.error("Error fetching channel:", err);
            }
        };
        fetchChannel();
    }, [id]);

    if (!channel) return <div className="p-10 text-center">Loading channel...</div>;

    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            {/* 1. Channel Banner */}
            <div className="w-full h-50 md:h-62.5 bg-gray-200">
                {channel.channelBanner ? (
                    <img
                        src={channel.channelBanner}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-r from-gray-300 to-gray-400" />
                )}
            </div>

            {/* 2. Channel Info Header */}
            <div className="px-4 md:px-24 py-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-purple-700 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {channel.channelName.charAt(0)}
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-3xl font-bold">{channel.channelName}</h1>
                    <p className="text-gray-600 font-medium">@{channel.channelName.replace(/\s+/g, '').toLowerCase()}</p>
                    <p className="text-gray-500 text-sm mt-1">{channel.subscribers} subscribers • {channel.videos?.length || 0} videos</p>
                    <p className="text-gray-700 mt-2 max-w-2xl text-center md:text-left">{channel.description}</p>
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* 3. Videos Grid */}
            <div className="px-4 md:px-24 py-8">
                    <h2 className="text-xl font-bold mb-6">Videos</h2>
                    {channel.videos?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {channel.videos.map((video) => (
                                <VideoGrid key={video._id} video={video} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-lg">This channel hasn't uploaded any videos yet.</p>
                        </div>
                    )}
                </div> 
        </div>
    );
};

export default ChannelPage;