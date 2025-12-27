import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import VideoGrid from '../components/VideoGrid.jsx';

const Home = () => {
  const [videos, setVideos] = useState([]);

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
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoGrid key={video._id} video={video} />
      ))}
    </div>
  );
};

export default Home;