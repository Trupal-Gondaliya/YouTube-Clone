import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import SearchVideoCard from "./SearchVideoCard.jsx";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";

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
    <div className="p-10 bg-gray-50 min-h-screen w-full top-14 dark:bg-black">
      {videos.length > 0 ? (
        videos.map((video) => (
          <SearchVideoCard key={video._id} video={video} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-gray-400 w-full">
          <HiOutlineVideoCameraSlash className="text-8xl mb-4 opacity-10" />
          <h2 className="text-2xl font-bold text-gray-700 dark:text-white">No videos found</h2>
          <p className="text-gray-500 mt-2 text-center">
            There are currently no videos in the
            <span className="font-bold text-gray-700 dark:text-white"> "{query}"</span> category.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;