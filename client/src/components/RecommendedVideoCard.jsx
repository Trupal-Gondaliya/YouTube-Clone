import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedVideoCard = ({ video }) => {
    return (
        // Link wraps the entire card to make it clickable.
        <Link to={`/video/${video._id}`} className="flex gap-2 cursor-pointer group">
            {/* Thumbnail Container */}
            <div className="relative w-40 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                <img src={video.thumbnailUrl} alt="thumb" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
            </div>
            
            {/* Video Metadata Section */}
            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold leading-tight line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 dark:text-white">{video.channelId?.channelName}</p>
                <p className="text-xs text-gray-500 dark:text-white">{video.views.length} views</p>
            </div>
        </Link>
    );
};

export default RecommendedVideoCard;