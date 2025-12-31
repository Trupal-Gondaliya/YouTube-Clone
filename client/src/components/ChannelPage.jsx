import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';
import VideoGrid from './VideoGrid.jsx';
import { useSelector } from 'react-redux';
import EditChannel from './EditChannel.jsx';
import { useDispatch } from 'react-redux';
import { updateUserSuccess } from '../redux/userSlice';

const ChannelPage = () => {
    const { id } = useParams();
    const [channel, setChannel] = useState(null);
    const { currentUser } = useSelector(state => state.user);
    const [openEdit, setOpenEdit] = useState(false);
    const dispatch = useDispatch();

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
    const userData = channel.owner;

    const isOwner = currentUser?._id === channel.owner?._id;

    const handleDeleteChannel = async () => {
        if (window.confirm("Are you sure you want to delete this channel? All videos will be lost.")) {
            try {
                await axiosInstance.delete(`/channels/${channel._id}`);
                const updatedChannels = currentUser.channels.filter(id => id !== channel._id);
                dispatch(updateUserSuccess({ channels: updatedChannels }));
                alert("Channel Deleted");
                window.location.href = "/";
            } catch (err) {
                console.error(err);
            }
        }
    };

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
                    {channel.owner?.avatar ? (
                        <img
                            src={channel.owner.avatar}
                            alt={channel.owner.username}
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <span>{channel.owner?.username?.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-3xl font-bold">{channel.channelName}</h1>
                    <p className="text-gray-600 font-medium">@{channel.channelName.replace(/\s+/g, '').toLowerCase()}</p>
                    <p className="text-gray-500 text-sm mt-1">{channel.subscribers} subscribers • {channel.videos?.length || 0} videos</p>
                    <p className="text-gray-700 mt-2 max-w-2xl text-center md:text-left">{channel.description}</p>

                    {/* Action Buttons for Owner */}
                    {isOwner && (
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => setOpenEdit(true)}
                                className="bg-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                                Customize Channel
                            </button>
                            <button
                                onClick={handleDeleteChannel}
                                className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-200 transition">
                                Delete Channel
                            </button>
                        </div>
                    )}
                    {!isOwner && (
                        <button className="bg-black text-white px-4 py-2 rounded-full font-medium mt-4 hover:bg-gray-800">
                                Subscribe
                            </button>
                    )}
                </div>
                {openEdit && <EditChannel setOpen={setOpenEdit} channel={channel} />}
            </div>

            <hr className="border-gray-200" />

            {/* 3. Videos Grid */}
            <div className="px-4 md:px-24 py-8">
                <h2 className="text-xl font-bold mb-6">Videos</h2>
                {channel.videos?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {channel.videos.map((video) => (
                            <VideoGrid key={video._id} video={video} userData={userData} />
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