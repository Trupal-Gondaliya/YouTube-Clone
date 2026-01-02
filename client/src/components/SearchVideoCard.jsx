import React from "react";
import { Link } from "react-router-dom";

const SearchVideoCard = ({ video }) => {
    return (
        <Link to={`/video/${video._id}`} className="flex flex-col md:flex-row gap-4 mb-5 group cursor-pointer">
            <div className="relative w-full md:w-96 h-52 shrink-0 overflow-hidden rounded-xl">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Video Details */}
            <div className="">
                <h3 className="text-xl font-semibold line-clamp-2 text-gray-900 leading-tight">
                    {video.title}
                </h3>
                <div className="text-xs text-gray-600 items-center">
                    <span>{video.views.length || 0} views</span>
                </div>

                {/* Channel Info */}
                <div className="flex items-center gap-2 my-4">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                        {video.uploader?.avatar ? (
                            <img src={video.uploader.avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-purple-600 text-[10px] text-white">
                                {video.uploader?.username?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <span className="text-sm text-gray-700 hover:text-black font-medium">
                        {video.channelId?.channelName || video.uploader?.username}
                    </span>
                </div>

                {/* Description Snippet */}
                <p className="text-sm text-gray-500 line-clamp-2">
                    {video.description}
                </p>
            </div>
        </Link>
    );
};

export default SearchVideoCard;