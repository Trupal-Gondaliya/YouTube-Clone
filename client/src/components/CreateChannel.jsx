import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import uploadToCloudinary from '../utils/uploadToCloudinary';
import { useNavigate } from 'react-router-dom';

const CreateChannel = ({ setOpen }) => {
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const { currentUser } = useSelector(state => state.user);
    const [bannerFile, setBannerFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreate = async () => {
        if (!channelName) return alert("Channel name is required!");
        let bannerUrl = "";
        try {
            if (bannerFile) {
                bannerUrl = await uploadToCloudinary(bannerFile, "image");
            }

            // Save metadata to MongoDB 
            const res = await axiosInstance.post("/channels/create", {
                channelName,
                description,
                channelBanner: bannerUrl
            });

            // Update Redux state immediately so the user can upload videos 
            const updatedUser = {
                ...currentUser,
                channels: [...(currentUser.channels || []), res.data._id]
            };
            dispatch(loginSuccess(updatedUser));

            alert("Channel Created!");
            navigate(`/channel/${res.data._id}`);
            setOpen(false);
        } catch (err) {
            console.error("Creation failed:", err);
            alert("Something went wrong. Check console.");
        }
    };

    return (
        <div className="fixed inset-0 top-14 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100">
            <div className="bg-white w-112.5 p-8 rounded-2xl shadow-2xl flex flex-col gap-4">
                <h2 className="text-xl font-bold">Channel Details</h2>

                <input type="text" placeholder="Channel Name" className="border p-2 rounded"
                    onChange={(e) => setChannelName(e.target.value)} />

                <textarea placeholder="Description" className="border p-2 rounded"
                    onChange={(e) => setDescription(e.target.value)} />

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Channel Banner (Optional)</label>
                    <input type="file" accept="image/*"
                        onChange={(e) => setBannerFile(e.target.files[0])} />
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={() => setOpen(false)}
                        className=" w-1/2 bg-red-500 text-white py-2 rounded font-bold hover:bg-red-800 disabled:bg-gray-400">Cancel</button>
                    <button onClick={handleCreate} className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded">Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateChannel;