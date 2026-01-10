// import all required file
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';
import VideoGrid from './VideoGrid.jsx';
import { useSelector } from 'react-redux';
import EditChannel from './EditChannel.jsx';
import { useDispatch } from 'react-redux';
import { updateUserSuccess } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { BiUserVoice } from "react-icons/bi";
import DeleteChannel from './DeleteChannel.jsx';

const ChannelPage = () => {
    const { id } = useParams(); // id from url paramter
    const [channel, setChannel] = useState(null); //all channel data
    const { currentUser } = useSelector(state => state.user); //login user info
    const [openEdit, setOpenEdit] = useState(false);
    const dispatch = useDispatch();
    const [isExpandedDesc, setIsExpandedDesc] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false);

    // get channel data from api
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

    // delete channel
    const handleDeleteChannel = async () => {
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

    // subscribe handler functionality
    const handelSubscribe = async () => {
        if (!currentUser) return alert("Please login to subscribe to the channel!!");
        const targetChannelId = channel._id || channel.id;
        try {
            await axiosInstance.put(`/channels/subscribe/${targetChannelId}`);
            setChannel((prev) => {
                const currentSubscribers = channel.subscribers || [];
                const isSubscribed = currentSubscribers.includes(currentUser._id);
                return {
                    ...prev,
                    subscribers: isSubscribed
                        ? currentSubscribers.filter((id) => id !== currentUser._id)
                        : [...currentSubscribers, currentUser._id]
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

    // slice description
    const descriptionLimit = 80;
    const displayText = channel.description?.slice(0, descriptionLimit);

    return (
        <div className="flex flex-col w-full min-h-screen bg-white dark:bg-black">
            {/* 1. Channel Banner */}
            <div className="w-full h-50 md:h-62.5 bg-gray-200">
                {channel.channelBanner ? (
                    <img
                        src={channel.channelBanner}
                        alt="Banner"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-r from-gray-300 to-gray-400" />
                )}
            </div>

            {/* 2. Channel Info Header */}
            <div className="px-4 md:px-24 py-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-purple-700 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {channel.owner?.avatar ? (
                        // User Profile Picture or Initial Placeholder 
                        <img
                            src={channel.owner.avatar}
                            alt={channel.owner.username}
                            loading="lazy"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        // Fallback: Display the first letter of the username if no avatar exists
                        <span>{channel.owner?.username?.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                {/* channel data */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h1 className="text-3xl font-bold">{channel.channelName}</h1>
                    <p className="text-gray-600 font-medium dark:text-white"><span className='text-black dark:text-white'>@{channel.channelName.replace(/\s+/g, '').toLowerCase()}</span> • {channel.subscribers.length || 0} subscribers • {channel.videos.length} videos</p>
                    <div className="flex">
                        <p className="text-gray-700 mt-2 max-w-2xl text-center md:text-left dark:text-gray-300">
                            {displayText}
                        </p>
                        <button
                            onClick={() => setIsExpandedDesc(true)}
                            className="text-sm font-bold mt-2 cursor-pointer hover:text-gray-600 dark:text-white"
                        >
                            ...more
                        </button>
                    </div>
                    {/* show all details about channel */}
                    {isExpandedDesc && (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-200 p-4" onClick={() => setIsExpandedDesc(false)}>
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full relative max-h-[85vh] flex flex-col overflow-auto dark:bg-neutral-800"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center">
                                <p className="text-2xl font-bold">{channel.channelName}</p>
                                <button
                                    onClick={() => setIsExpandedDesc(false)}
                                    className="text-2xl p-3 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-neutral-700 hover:rounded-full transition-colors"
                                >
                                    <FaXmark />
                                </button>
                            </div>
                            <div>
                                <p className="mt-3 text-2xl font-bold">Description</p>
                                <p className="text-gray-700 whitespace-pre-wrap dark:text-white">
                                    {channel.description || "Description..."}
                                </p>
                            </div>
                            <p className="my-3 text-2xl font-bold">More info</p>
                            <div className='flex flex-col gap-4 '>

                                <div className='flex items-center gap-3'>
                                    <BiUserVoice className='text-3xl' />
                                    <p>{channel.subscribers.length} subscribers</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <CiYoutube className='text-3xl' />
                                    <p>{channel.videos.length} videos</p>
                                </div>
                            </div>
                        </div>
                    </div>)}

                    {/* Action Buttons for Owner */}
                    {isOwner && (
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => setOpenEdit(true)}
                                className="text-xs md:text-[15px] bg-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition">
                                Customize Channel
                            </button>
                            <button
                                onClick={() => setIsDelOpen(true)}
                                className="text-xs md:text-[15px] bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-200 transition">
                                Delete Channel
                            </button>
                            {isDelOpen && (
                                <DeleteChannel
                                    onClose={() => setIsDelOpen(false)}
                                    onConfirm={handleDeleteChannel}
                                    title={channel.channelName}
                                />
                            )}
                            <Link to={`/channel/${channel._id}/manage`}>
                                <button className="text-xs md:text-[15px] bg-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition dark:bg-neutral-800 dark:hover:bg-neutral-700">
                                    Manage videos
                                </button>
                            </Link>
                        </div>
                    )}
                    {/* subscribe button */}
                    {!isOwner && (
                        <button onClick={handelSubscribe}
                            className={`${channel.subscribers?.includes(currentUser?._id)
                                ? "bg-gray-200 text-black"
                                : "bg-black text-white"
                                } px-4 py-2 rounded-full font-medium mt-4 hover:opacity-80 transition`}>
                            {channel.subscribers?.includes(currentUser?._id)
                                ? "Subscribed"
                                : "Subscribe"}
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