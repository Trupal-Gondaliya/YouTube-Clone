import React from 'react';
import { Link } from 'react-router-dom';

const VideoGrid = ({ video, userData }) => {
  const avatarSrc = video.uploader?.avatar || userData?.avatar;
  const displayName = video.uploader?.username || userData?.username || "U";

  return (
    <Link to={`/video/${video._id}`} className="flex flex-col gap-2 mb-8 cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
      </div>

      {/* Details */}
      <div className="flex gap-3 px-1">
        <div className="w-9 h-9 rounded-full bg-purple-600 shrink-0 flex items-center justify-center text-white text-sm font-bold">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="avtar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span>{displayName.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-md leading-tight line-clamp-2">{video.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{video.channelId?.channelName}</p>
          <p className="text-gray-600 text-sm">{video.views.length} views</p>
        </div>
      </div>
    </Link>
  );
};
export default VideoGrid;