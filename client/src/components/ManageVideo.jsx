import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { FaEdit, FaTrash, FaRegEye, FaRegHeart } from "react-icons/fa";
import EditVideoModal from './EditVideoModal.jsx';

const ManageVideo = () => {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    const fetchVideos = async () => {
            try {
                const res = await axiosInstance.get(`/channels/${id}`);
                setVideos(res.data.videos);
            } catch (err) {
                console.error(err);
            }
        };
    useEffect(() => {
        fetchVideos();
    }, [id]);

    const handleDelete = async (videoId) => {
        if (window.confirm("Permanent delete this video?")) {
            try {
                await axiosInstance.delete(`/videos/${videoId}`);
                setVideos(videos.filter(v => v._id !== videoId));
                alert("Video removed successfully");
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEditClick = (video) => {
        setSelectedVideo(video);
        setOpenEdit(true);
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Channel Content</h1>
                    <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">Back</button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-600 text-sm uppercase">
                                <th className="p-4 font-semibold">Video</th>
                                <th className="p-4 font-semibold text-center">Category</th>
                                <th className="p-4 font-semibold text-center">Views</th>
                                <th className="p-4 font-semibold text-center">Likes</th>
                                <th className="p-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {videos.map(video => (
                                <tr key={video._id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="p-4 flex gap-4 items-center">
                                        <div className="relative group">
                                            <img src={video.thumbnailUrl} className="w-28 h-16 object-cover rounded-lg shadow-sm" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-800 line-clamp-1 w-48">{video.title}</span>
                                            <span className="text-xs text-gray-500">{new Date(video.createdAt).toDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">{video.category}</span>
                                    </td>
                                    <td className="p-4 text-center text-sm text-gray-600">
                                        <div className="flex items-center justify-center gap-1"><FaRegEye /> {video.views.length}</div>
                                    </td>
                                    <td className="p-4 text-center text-sm text-gray-600">
                                        <div className="flex items-center justify-center gap-1"><FaRegHeart className="text-red-400" /> {video.likes.length}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => handleEditClick(video)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                                                <FaEdit className='text-xl' />
                                            </button>
                                            <button onClick={() => handleDelete(video._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                                                <FaTrash className='text-md' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {openEdit && <EditVideoModal setOpen={setOpenEdit} video={selectedVideo} refresh={fetchVideos} />}
        </div>
    );
};

export default ManageVideo;