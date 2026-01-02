import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import SearchVideoCard from "./SearchVideoCard.jsx";

const SearchPage = () => {
  const [videos, setVideos] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get(`/videos/search?q=${query}`);
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, [query]);

  return (
    <div className="p-10 bg-gray-50 min-h-screen w-full">
      {videos.length > 0 ? (
        videos.map((video) => (
          <SearchVideoCard key={video._id} video={video} />
        ))
      ) : (
        <p className="text-center w-full text-gray-500 text-xl">No videos found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchPage;