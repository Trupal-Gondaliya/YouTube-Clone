import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedVideoCard = ({ video }) => {
    return (
        // Link wraps the entire card to make it clickable.
        <Link to={`/video/${video._id}`} className="flex flex-col md:flex-row gap-3 mb-4 cursor-pointer group">
            {/* Thumbnail Container */}
            <div className="relative w-full aspect-video md:w-40 shrink-0 overflow-hidden bg-gray-200">
                <img src={video.thumbnailUrl} alt="thumb" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
            </div>
            
            {/* Video Metadata Section */}
            <div className="flex flex-col gap-1 px-2 md:px-0">
                <h3 className="text-sm md:text-[14px] font-bold leading-tight line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 dark:text-white">{video.channelId?.channelName}</p>
                <p className="text-xs text-gray-500 dark:text-white">{video.views.length} views</p>
            </div>
        </Link>
    );
};

export default RecommendedVideoCard;