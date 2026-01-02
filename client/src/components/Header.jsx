// src/components/Header.jsx
import { HiMenu } from "react-icons/hi";
import { AiOutlineSearch, AiFillYoutube } from "react-icons/ai";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiYoutube } from "react-icons/fi";
import { CgLivePhoto } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";
import CreateChannel from "./CreateChannel.jsx";

const Header = ({ toggleSidebar }) => {
    const { currentUser } = useSelector(state => state.user);
    const [showMenu, setShowMenu] = useState(false);
    const [showChannel, setShowChannel] = useState(false);
    const [openChannelModal, setOpenChannelModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    // logout function
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("access_token");
        setShowMenu(false);
        navigate("/");
    };

    // Function to get the first letter of the username
    const getFirstLetter = (name) => {
        return name ? name.charAt(0).toUpperCase() : "?";
    };

    // function to view channel page
    const viewChannelPage = () => {
        if (currentUser?.channels && currentUser.channels.length > 0) {
            // Navigate to the first channel in their list
            navigate(`/channel/${currentUser.channels[0]}`);
        } else {
            alert("You don't have a channel yet. Create one first!");
            setOpenChannelModal(true);
        }
    }

    const handleSearchClick = (e) => {
        if (searchInput.trim()) {
            navigate(`/search?q=${searchInput}`);
        }
    };

    const handleUploadClick = () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        // Check if the user has any channels in their profile 
        if (currentUser.channels && currentUser.channels.length > 0) {
            // Navigate to Upload Page and pass the channel ID
            navigate("/upload", { state: { channelId: currentUser.channels[0] } });
        } else {
            alert("Please create a channel first to upload videos.");
            setOpenChannelModal(true);
        }
        setShowChannel(false);
    };

    return (
        <header className="flex justify-between items-center px-4 h-14 sticky top-0 z-50 bg-white">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="cursor-pointer p-2 hover:bg-gray-100 rounded-full text-2xl">
                    <HiMenu />
                </button>
                <div className="flex items-center gap-1 cursor-pointer">
                    <AiFillYoutube className="text-red-600 text-3xl" />
                    <span className="font-bold text-xl tracking-tighter">YouTube<sup className="text-[12px] font-medium text-gray-600"> IN</sup></span>
                </div>
            </div>

            <div className="flex items-center justify-center w-1/2 gap-4 group">
                <div className="flex items-center flex-1 max-w-150">
                    <div className="flex items-center flex-1 h-10 px-4 bg-white border border-gray-300 rounded-l-full focus-within:border-blue-500 focus-within:shadow-inner">
                        <input
                            onChange={e => setSearchInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearchClick(e)}
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent outline-none text-base" />
                    </div>
                    <button onClick={handleSearchClick} className="cursor-pointer flex items-center justify-center w-16 h-10 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
                        <AiOutlineSearch className="text-2xl" />
                    </button>
                </div>

                <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer">
                    <MdOutlineKeyboardVoice className="text-2xl" />
                </button>
            </div>

            <div className="flex gap-6 items-center">
                {currentUser ? (
                    <>
                        <div className="relative">
                            <button onClick={() => setShowChannel(!showChannel)}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 py-2 px-5 rounded-full transition-colors">
                                <GoPlus className="text-2xl" />
                                <span className="font-medium">Create</span>
                            </button>
                            {/* Dropdown menu for create */}
                            {showChannel && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <button onClick={handleUploadClick}
                                        className="w-full text-left px-4 py-2 text-md hover:bg-gray-200 transition flex items-center gap-2">
                                        <FiYoutube />
                                        <span>Upload video</span>
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-md hover:bg-gray-200 transition flex items-center gap-2">
                                        <CgLivePhoto />
                                        <span>Go live</span>
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-md hover:bg-gray-200 transition flex items-center gap-2">
                                        <IoCreateOutline />
                                        <span>Create post</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full">
                            <IoMdNotificationsOutline className="text-2xl" />
                        </div>
                        {/* User Avatar Circle */}
                        <div className="relative">
                            <div onClick={() => setShowMenu(!showMenu)} className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-purple-800 transition-colors">
                                {currentUser.avatar ? (
                                    <img
                                        src={currentUser.avatar}
                                        alt={currentUser.username}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <span>{getFirstLetter(currentUser.username)}</span>
                                )}
                            </div>
                            {/* Dropdown Menu */}
                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                                    <button onClick={viewChannelPage}
                                        className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-semibold">{currentUser.username}</p>
                                        <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition">
                                        Sign out
                                    </button>
                                    <button onClick={() => setOpenChannelModal(true)}
                                        className="w-full text-left px-4 py-2 text-md text-blue-800 hover:bg-gray-100 transition">
                                        Create Channel
                                    </button>
                                    {openChannelModal && <CreateChannel setOpen={setOpenChannelModal} />}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-6">
                        <div className="cursor-pointer hover:bg-gray-200 rounded-full p-2">
                            <BsThreeDotsVertical className="text-xl" />
                        </div>
                        <Link to="/login" className="text-blue-600 flex items-center gap-2 text-xl border rounded-full border-gray-300 px-3 h-10 cursor-pointer hover:bg-blue-100 transition-colors">
                            <FaRegCircleUser />
                            <span className="text-[15px] font-medium">Sign in</span>
                        </Link>
                    </div>
                )}
            </div>
        </header >
    );
};

export default Header;