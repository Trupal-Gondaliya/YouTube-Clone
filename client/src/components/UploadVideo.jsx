import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import uploadToCloudinary from '../utils/uploadToCloudinary';
import axiosInstance from '../utils/axiosInstance';

const UploadVideo = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [inputs, setInputs] = useState({ title: "", description: "", category: "" });
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const channelId = location.state?.channelId;

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!videoFile || !imgFile) return alert("Please select both video and thumbnail!");

        setLoading(true);
        try {
            // 1. Upload Video and Image to Cloudinary
            const videoUrl = await uploadToCloudinary(videoFile, "video");
            const thumbnailUrl = await uploadToCloudinary(imgFile, "image");

            // 2. Save metadata to MongoDB 
            const res = await axiosInstance.post("/videos/", {
                ...inputs,
                videoUrl,
                thumbnailUrl,
                channelId
            });

            alert("Video uploaded successfully!");
            navigate(`/channel/${channelId}`);
        } catch (err) {
            console.error(err);
            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categories = [
        "Lord", "Music", "Gaming", "Education", "Technology", "Film", "Animation",
        "Comedy", "Entertainment", "Vlogs", "Science", "News", "Politics",
        "Travel", "Pets", "Animals", "Health", "Sports", "Yoga", "Beauty", "Food",
        "Art", "Motivation", "Other"
    ];

    return (
        <div onClick={() => navigate('/')} className="fixed inset-0 top-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center p-4 min-h-screen z-100">
            <form onSubmit={handleUpload} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl flex flex-col gap-4 max-h-[95vh] overflow-y-auto dark:bg-neutral-800">
                <h1 className="text-2xl font-bold text-red-600">Upload a Video</h1>

                <label className="font-semibold">Video File:</label>
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required className='border p-2' />

                <label className="font-semibold">Thumbnail Image:</label>
                <input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files[0])} required className='border p-2' />

                <input type="text" name="title" placeholder="Title" className="border p-2 rounded" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" className="border p-2 rounded h-32" onChange={handleChange} required />

                <div className="relative flex flex-col gap-1">
                    <label className="font-semibold text-sm text-gray-600 dark:text-white">Category</label>

                    {/* The Select Button */}
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="border p-3 rounded-lg bg-white cursor-pointer flex justify-between items-center dark:bg-neutral-800">
                        {inputs.category || "Select Category"}
                        <span className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                    </div>

                    {/* The Scrollable Menu */}
                    {isDropdownOpen && (
                        <div className="absolute bottom-13 left-0 w-full z-50 bg-white dark:bg-neutral-700 border rounded-lg shadow-xl mt-1 max-h-48 overflow-y-auto
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-white
                            dark:[&::-webkit-scrollbar-thumb]:bg-black">
                            {categories.map((cat) => (
                                <div
                                    key={cat}
                                    className="p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer text-sm"
                                    onClick={() => {
                                        setInputs({ ...inputs, category: cat });
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/')}
                        className=" w-1/2 bg-red-500 text-white py-2 rounded font-bold hover:bg-red-800 disabled:bg-gray-400">Cancel</button>
                    <button type="submit" disabled={loading} className="w-1/2 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-800 disabled:bg-gray-400">
                        {loading ? "Uploading... Please Wait" : "Upload Video"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadVideo;