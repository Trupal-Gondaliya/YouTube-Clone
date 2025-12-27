import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import VideoGrid from '../components/VideoGrid.jsx';
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const { isSidebarOpen } = useOutletContext();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/videos/"); 
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className={`grid gap-4 transition-all duration-300
        ${isSidebarOpen 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-4'
        }`}
      > {videos.map((video) => (
        <VideoGrid key={video._id} video={video} />
      ))}
    </div>
  );
};

export default Home;