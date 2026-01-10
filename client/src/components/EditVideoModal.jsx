import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { FaXmark } from "react-icons/fa6";
import uploadToCloudinary from '../utils/uploadToCloudinary';

const EditVideoModal = ({ setOpen, video, refresh }) => {
    // Local state for text fields and existing thumbnail URL
    const [inputs, setInputs] = useState({
        title: video.title,
        description: video.description,
        category: video.category,
        thumbnailUrl: video.thumbnailUrl
    });

    // imgFile holds the actual File object if the user selects a new image
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categories = [
        "Lord", "Music", "Gaming", "Education", "Technology", "Film", "Animation",
        "Comedy", "Entertainment", "Vlogs", "Science", "News", "Politics",
        "Travel", "Pets", "Animals", "Health", "Sports", "Yoga", "Beauty", "Food",
        "Art", "Motivation", "Other"
    ];

    // Generic handler for text inputs and textareas
    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handles selecting a new image file and creates a local preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImgFile(file);

        // FileReader creates a base64 string for instant UI preview before upload
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputs(prev => ({ ...prev, thumbnailUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // Main submission logic
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let currentThumbnail = inputs.thumbnailUrl;

            // If a new file was selected, upload to Cloudinary first
            if (imgFile) {
                currentThumbnail = await uploadToCloudinary(imgFile, "image");
            }

            // Update database via backend API
            await axiosInstance.put(`/videos/${video._id}`, {
                ...inputs, thumbnailUrl: currentThumbnail
            });
            alert("Video updated!");
            refresh(); // Refresh parent list
            setOpen(false); // Close modal
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Modal Overlay */
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-200 p-4">
            <form onSubmit={handleUpdate} className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-4 sm:p-6 flex flex-col gap-4 dark:bg-neutral-800 max-h-[95vh] sm:max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-bold">Edit Video Details</h2>
                    <button type="button" onClick={() => setOpen(false)} className="dark:hover:bg-neutral-700 rounded-full p-3"><FaXmark /></button>
                </div>

                {/* Scrollable Form Body */}
                <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-3 flex flex-col gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-white">Thumbnail</label>
                        <div className="relative group h-32 w-full bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300">
                            <img src={inputs.thumbnailUrl} alt="Thumbnail" loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <input type="file" accept="image/*" onChange={e => handleFileChange(e)} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                    </div>

                    {/* Title Input */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">Title</label>
                        <input name="title" type="text" value={inputs.title} onChange={handleChange} className="border p-2 rounded-lg outline-none focus:border-blue-500" required />
                    </div>
                    
                    {/* Description Area */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">Description</label>
                        <textarea name="description" value={inputs.description} onChange={handleChange} className="border p-2 rounded-lg h-32 resize-none outline-none focus:border-blue-500 overflow-y-auto
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500" required />
                    </div>
                    
                    {/* Custom Category Dropdown */}
                    <div className="flex flex-col gap-1 relative">
                        <label className="text-sm font-semibold">Category</label>
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="border p-3 rounded-lg bg-white dark:bg-neutral-800 cursor-pointer flex justify-between items-center">
                            {inputs.category || "Select Category"}
                            <span className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                        </div>

                        {/* The Scrollable Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-full z-50 bg-white  dark:bg-neutral-800 border rounded-lg shadow-xl mt-1 max-h-20 overflow-y-auto custom-scrollbar">
                                {categories.map((cat) => (
                                    <div
                                        key={cat}
                                        className="p-3 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer text-sm"
                                        onClick={() => {
                                            setInputs(prev => ({ ...prev, category: cat }));
                                            setIsDropdownOpen(false);
                                        }}>
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                        <button type="button" onClick={() => setOpen(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700">Cancel</button>
                        <button disabled={loading} type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditVideoModal;