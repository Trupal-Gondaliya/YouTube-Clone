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

    return (
        <div className="fixed inset-0 top-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center p-10 min-h-screen z-100 overflow-scroll">
            <form onSubmit={handleUpload} className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-red-600">Upload a Video</h1>
                
                <label className="font-semibold">Video File:</label>
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required className='border p-2'/>

                <label className="font-semibold">Thumbnail Image:</label>
                <input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files[0])} required className='border p-2' />

                <input type="text" name="title" placeholder="Title" className="border p-2 rounded" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" className="border p-2 rounded h-32" onChange={handleChange} required />
                
                <select name="category" className="border p-2 rounded" onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Music">Music</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Education">Education</option>
                    <option value="Technology">Technology</option>
                </select>

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