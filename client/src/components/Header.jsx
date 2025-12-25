// src/components/Header.jsx
import { HiMenu } from "react-icons/hi";
import { AiOutlineSearch, AiFillYoutube } from "react-icons/ai";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../redux/userSlice.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
    const { currentUser } = useSelector(state => state.user);
    const [showMenu, setShowMenu] = useState(false); // Controls the dropdown
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                        <AiOutlineSearch className="mr-2 text-gray-500 hidden group-focus-within:block" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent outline-none text-base" />
                    </div>
                    <button className="cursor-pointer flex items-center justify-center w-16 h-10 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
                        <AiOutlineSearch className="text-2xl" />
                    </button>
                </div>

                <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer">
                    <MdOutlineKeyboardVoice className="text-2xl" />
                </button>
            </div>

            <div className="flex gap-4 items-center relative">
                <div >
                    <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                {currentUser ? (
                    <div className="relative">
                        {/* User Avatar Circle */}
                        <div onClick={() => setShowMenu(!showMenu)} className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-purple-800 transition-colors">
                            {getFirstLetter(currentUser.username)}
                            
                        </div>
                        {/* Dropdown Menu */}
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-semibold">{currentUser.username}</p>
                                    <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition">
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="text-blue-600 flex items-center gap-2 text-xl border rounded-full border-gray-300 px-3 h-10 cursor-pointer hover:bg-blue-100 transition-colors">
                        <FaRegCircleUser />
                        <span className="text-[15px] font-medium">Sign in</span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;