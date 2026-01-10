import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import SearchVideoCard from "./SearchVideoCard.jsx";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";

const SearchPage = () => {
  // State to store the list of videos returned from the API
  const [videos, setVideos] = useState([]);

  // Extract the search query ('q') from the URL parameters (e.g., /search?q=coding)
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    // Fetches videos from the backend based on the search query.
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get(`/videos/search?q=${query}`);
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, [query]); // Dependency array ensures re-run when user searches for something new

  return (
    <div className="p-10 bg-gray-50 min-h-screen w-full top-14 dark:bg-black">
      {/* Conditional Rendering:  Check if there are videos in the array. 
          If yes, map through them; if no, show the empty state UI.
      */}
      {videos.length > 0 ? (
        videos.map((video) => (
          <SearchVideoCard key={video._id} video={video} />
        ))
      ) : (
        // "No Results" State: Shown when the search returns an empty array
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