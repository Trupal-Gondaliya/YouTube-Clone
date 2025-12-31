import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import uploadToCloudinary from '../utils/uploadToCloudinary';
import { FaXmark } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { updateUserSuccess } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const EditChannel = ({ setOpen, channel }) => {
    const [name, setName] = useState(channel.channelName);
    const [desc, setDesc] = useState(channel.description);

    //File states for uploading
    const [banner, setBanner] = useState(null);
    const [avatar, setAvatar] = useState(null);

    // Preview states (initialized with existing images)
    const [bannerPreview, setBannerPreview] = useState(channel.channelBanner);
    const [avatarPreview, setAvatarPreview] = useState(channel.owner?.avatar);

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'banner') {
                setBanner(file);
                setBannerPreview(reader.result);
            } else {
                setAvatar(file);
                setAvatarPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const removeBanner = () => {
        setBanner(null);
        setBannerPreview("");
    };

    const removeAvatar = () => {
        setAvatar(null);
        setAvatarPreview("");
    };

    const handleUpdate = async () => {
        setLoading(true);
        let bannerUrl = bannerPreview;
        let avatarUrl = avatarPreview;
        try {
            if (banner) {
                bannerUrl = await uploadToCloudinary(banner, "image");
            }
            if (avatar) {
                avatarUrl = await uploadToCloudinary(avatar, "image");
            }

            await axiosInstance.put(`/channels/${channel._id}`, {
                channelName: name,
                description: desc,
                channelBanner: bannerUrl,
                avatar: avatarUrl
            });

            if (avatar) {
                dispatch(updateUserSuccess({ avatar: avatarUrl }));
            }

            alert("Channel Updated!");
            window.location.reload(); // Refresh to see changes
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-200 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">Edit Channel Settings</h2>
                    <button onClick={() => setOpen(false)} className="text-red-400 hover:text-gray-700">
                        <FaXmark className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    {/* Banner Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Channel Banner</label>
                        <div className="relative group h-32 w-full bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300">
                            {bannerPreview ? (
                                <>
                                    <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                                    <button onClick={removeBanner} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaXmark className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <IoMdPhotos className="w-8 h-8" />
                                    <span className="text-xs">No Banner Uploaded</span>
                                </div>
                            )}
                        </div>
                        <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'banner')} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                    </div>

                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                        <div className="relative group h-20 w-20 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200 shrink-0">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <FaRegUser className="w-full h-full text-gray-300 p-5" />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Profile Picture</label>
                            <div className="flex gap-2">
                                <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'avatar')} className="text-xs text-gray-500 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 hover:file:bg-gray-200" />
                                <button onClick={removeAvatar} className="text-xs text-red-600 font-medium">Remove</button>
                            </div>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Channel Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <textarea value={desc} onChange={e => setDesc(e.target.value)} className="border border-gray-300 p-2.5 rounded-lg h-28 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50 flex justify-end gap-3"><button onClick={() => setOpen(false)} className="px-5 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
                    <button disabled={loading} onClick={handleUpdate} className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors shadow-lg shadow-blue-200">
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditChannel;