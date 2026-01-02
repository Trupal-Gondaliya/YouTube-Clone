import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import VideoGrid from '../components/VideoGrid.jsx';
import { useOutletContext } from "react-router-dom";
import FilterBar from './FilterBar.jsx';
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const { isSidebarOpen } = useOutletContext();
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const url = selectedFilterCategory === "All"
          ? "/videos/"
          : `/videos/category?cat=${selectedFilterCategory}`;
        const res = await axiosInstance.get(url);
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [selectedFilterCategory]);

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <FilterBar
        selectedFilterCategory={selectedFilterCategory}
        setSelectedFilterCategory={setSelectedFilterCategory}
      />

      <div className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-500 font-medium">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            Loading videos...
          </div>
        ) : videos.length > 0 ? (
          <div className={`top-4 grid gap-4 transition-all duration-300
            ${isSidebarOpen
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {videos.map((video) => (
              <VideoGrid key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400 w-full">
            <HiOutlineVideoCameraSlash className="text-8xl mb-4 opacity-10" />
            <h2 className="text-2xl font-bold text-gray-700">No videos found</h2>
            <p className="text-gray-500 mt-2 text-center">
              There are currently no videos in the
              <span className="font-bold text-gray-700"> "{selectedFilterCategory}"</span> category.
            </p>
            <button
              onClick={() => setSelectedFilterCategory("All")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-md">
              Browse all videos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;