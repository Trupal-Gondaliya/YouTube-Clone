// src/components/Header.jsx
import { HiMenu } from "react-icons/hi";
import { AiOutlineSearch, AiFillYoutube } from "react-icons/ai";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

const Header = ({ toggleSidebar }) => {
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

            <div className="flex gap-4 items-center">
                <div >
                    <BsThreeDotsVertical className="cursor-pointer"/>
                </div>
                <div className="text-blue-600 group flex items-center gap-3 text-2xl border rounded-full border-gray-300 px-2 h-10 cursor-pointer hover:bg-blue-100">
                    <FaRegCircleUser className="cursor-pointer"/>
                    <span className="text-[15px]">Sign in</span>
                </div>
            </div>
        </header>
    );
};

export default Header;