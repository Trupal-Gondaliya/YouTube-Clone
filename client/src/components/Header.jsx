// src/components/Header.jsx
import { HiMenu } from "react-icons/hi";
import { AiOutlineSearch, AiFillYoutube } from "react-icons/ai";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { FaRegCircleUser, FaXmark } from "react-icons/fa6";
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
import { IoCreateOutline, IoArrowBackOutline } from "react-icons/io5";
import CreateChannel from "./CreateChannel.jsx";
import { toggleTheme } from "../redux/userSlice.js";

const Header = ({ toggleSidebar }) => {
    // State & Selectors
    const { currentUser } = useSelector(state => state.user);
    const [showMenu, setShowMenu] = useState(false);
    const [showChannel, setShowChannel] = useState(false);
    const [openChannelModal, setOpenChannelModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const { darkMode } = useSelector((state) => state.user);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        setShowMenu(false);
        if (currentUser?.channels && currentUser.channels.length > 0) {
            // Navigate to the first channel in their list
            navigate(`/channel/${currentUser.channels[0]}`);
        } else {
            alert("You don't have a channel yet. Create one first!");
            setOpenChannelModal(true);
        }
    }

    // functio to view all channel list
    const viewAllchannel = () => {
        setShowMenu(false);
        if (currentUser?.channels && currentUser.channels.length > 0) {
            // Navigate to the channel list
            navigate(`/allChannel`);
        } else {
            alert("You don't have a channel yet. Create one first!");
            setOpenChannelModal(true);
        }
    }

    // Handles search submission via button or Enter key.
    const handleSearchClick = (e) => {
        if (searchInput.trim()) {
            navigate(`/search?q=${searchInput}`);
        }
    };

    // Logic for Upload button:
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

    if (isSearchOpen) {
        return (
            <header className="flex items-center px-2 h-14 sticky top-0 z-50 bg-white dark:bg-black w-full gap-2">
                <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full"
                >
                    <IoArrowBackOutline className="text-2xl" />
                </button>
                
                <div className="flex flex-1 items-center h-10 px-4 bg-gray-100 dark:bg-neutral-900 rounded-full">
                    <input
                        autoFocus
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                        type="text"
                        placeholder="Search YouTube"
                        className="w-full bg-transparent outline-none text-base"
                    />
                    {searchInput && (
                        <FaXmark 
                            onClick={() => setSearchInput("")} 
                            className="text-xl cursor-pointer text-gray-600" 
                        />
                    )}
                </div>
                
                <button className="p-2 bg-gray-100 dark:bg-neutral-800 rounded-full">
                    <MdOutlineKeyboardVoice className="text-2xl" />
                </button>
            </header>
        );
    }

    return (
        <header className="flex justify-between items-center px-2 md:px-4 h-14 sticky top-0 z-50 bg-[#f9f9f9] text-black dark:bg-black dark:text-white">
            {/* LEFT SECTION: Menu & Logo */}
            <div className="flex items-center gap-1 md:gap-4 shrink-0">
                <button onClick={toggleSidebar} className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-2xl">
                    <HiMenu />
                </button>
                <Link to="/" className="flex items-center gap-1">
                    <AiFillYoutube className="text-red-600 text-3xl md:text-4xl" />
                    <span className="font-bold text-lg md:text-xl tracking-tighter hidden sm:block">
                        YouTube<sup className="text-[10px] font-medium ml-1">IN</sup>
                    </span>
                </Link>
            </div>

            {/* MIDDLE SECTION: Search Bar & Voice Search */}
            <div className="flex items-center justify-center flex-1 mx-2 md:mx-4 max-w-180">
                <div className="hidden md:flex items-center flex-1 group">
                    <div className="flex items-center flex-1 h-10 px-4 bg-white dark:bg-black border border-gray-300 dark:border-neutral-800 rounded-l-full focus-within:border-blue-500 focus-within:shadow-inner">
                        <input
                            onChange={e => setSearchInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearchClick(e)}
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent outline-none text-base" />
                    </div>
                    <button onClick={handleSearchClick} className="cursor-pointer flex items-center justify-center w-16 h-10 bg-gray-100 dark:bg-neutral-800 border border-l-0 border-gray-300 dark:border-neutral-800 rounded-r-full hover:bg-gray-200 dark:hover:bg-neutral-700">
                        <AiOutlineSearch className="text-2xl" />
                    </button>
                </div>

                {/* Mobile Search Icon Only */}
                <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full">
                    <AiOutlineSearch className="text-2xl" />
                </button>

                <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer dark:bg-neutral-800 dark:hover:bg-neutral-700 shrink-0">
                    <MdOutlineKeyboardVoice className="text-2xl" />
                </button>

            </div>

            {/* RIGHT SECTION: Auth Actions & User Profile */}
            <div className="flex gap-1 md:gap-3 items-center shrink-0">
                {currentUser ? (
                    <>
                        <div className="relative">
                            <button onClick={() => setShowChannel(!showChannel)}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 p-2 md:py-2 md:px-4 rounded-full transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700">
                                <GoPlus className="text-2xl" />
                                <span className="font-medium">Create</span>
                            </button>
                            {/* Dropdown menu for create */}
                            {showChannel && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-2 z-50">
                                    <button onClick={handleUploadClick}
                                        className="w-full text-left px-4 py-2 text-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition flex items-center gap-2">
                                        <FiYoutube />
                                        <span>Upload video</span>
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition flex items-center gap-2">
                                        <CgLivePhoto />
                                        <span>Go live</span>
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition flex items-center gap-2">
                                        <IoCreateOutline />
                                        <span>Create post</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="hidden sm:block cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded-full">
                            <IoMdNotificationsOutline className="text-2xl" />
                        </div>
                        {/* User Avatar Circle */}
                        <div className="relative">
                            <div onClick={() => setShowMenu(!showMenu)} className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-purple-700 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-purple-800 transition-colors">
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
                                <div className="absolute right-0 mt-2 w-56 bg-white border dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 rounded-xl shadow-xl py-2 z-50">
                                    <div className="px-4 py-3 border-b dark:border-neutral-700">
                                        <p className="text-sm font-bold truncate">{currentUser.username}</p>
                                        <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                                    </div>
                                    <button onClick={viewChannelPage} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700">Your Channel</button>
                                    <button onClick={() => dispatch(toggleTheme())} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 flex items-center justify-between">
                                        <span>Appearance</span>
                                        <span className="text-xs text-gray-400">{darkMode ? 'Dark' : 'Light'}</span>
                                    </button>
                                    <button onClick={() => setOpenChannelModal(true)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700">Create New Channel</button>
                                    <button onClick={viewAllchannel} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700">View All Channel</button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-neutral-700 border-t dark:border-neutral-700 mt-1">Sign out</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* LOGGED OUT STATE */
                    <div className="flex items-center gap-2  md:gap-4">
                        <div className="cursor-pointer hover:bg-gray-200 rounded-full p-2 dark:hover:bg-neutral-700">
                            <BsThreeDotsVertical className="text-xl hidden sm:block" />
                        </div>
                        <Link to="/login" className="text-blue-600 flex items-center gap-2 text-xl border rounded-full border-gray-300 px-3 h-10 cursor-pointer hover:bg-blue-100 transition-colors">
                            <FaRegCircleUser className="text-xl" />
                            <span className="text-sm font-medium">Sign in</span>
                        </Link>
                    </div>
                )}
            </div>
            {openChannelModal && <CreateChannel setOpen={setOpenChannelModal} />}
        </header >
    );
};

export default Header;