import React, { useState } from "react";
// Ensure all these icons are imported in your project
import { MdExpandLess, MdExpandMore, MdOutlineSubscriptions, MdOutlineFeedback, MdOutlinePlaylistPlay, MdOutlineWatchLater } from "react-icons/md";
import { SiYoutubeshorts, SiYoutubegaming, SiYoutubemusic, SiYoutubekids } from "react-icons/si";
import { IoMdHome, IoIosHelpCircleOutline } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMusicalNoteOutline, IoSettingsOutline } from "react-icons/io5";
import { BiMovie } from "react-icons/bi";
import { TbLivePhoto, TbBrandApplePodcast } from "react-icons/tb";
import { FaRegNewspaper } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { SlGraduation } from "react-icons/sl";
import { PiCoatHanger } from "react-icons/pi";
import { AiFillYoutube, AiOutlineLike } from "react-icons/ai";
import { CiFlag1, CiYoutube } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarItem = ({ icon, label, isOpen }) => (
    <div className={`flex items-center rounded-lg cursor-pointer transition-colors
        ${isOpen
            ? "flex-row gap-5 p-2 px-3 hover:bg-gray-100"
            : "flex-col gap-1 py-4 hover:bg-gray-100 justify-center items-center text-[10px]"
        }`}>
        <span className={`${isOpen ? "text-xl" : "text-2xl"}`}>{icon}</span>
        <span className={`${isOpen ? "text-sm" : "text-[10px]"} truncate`}>{label}</span>
    </div>
);

const Sidebar = ({ isOpen, toggleSidebar }) => {

    const { currentUser } = useSelector(state => state.user);

    // State to handle the "Show More / Show Less" toggle in the Explore section
    const [isExpanded, setIsExpanded] = useState(false);

    // Structured data for the Explore section to keep the JSX clean
    const exploreItems = [
        { icon: <RiShoppingBag4Line />, label: "Shopping" },
        { icon: <IoMusicalNoteOutline />, label: "Music" },
        { icon: <BiMovie />, label: "Movies" },
        { icon: <TbLivePhoto />, label: "Live" },
        { icon: <SiYoutubegaming />, label: "Gaming" },
        { icon: <FaRegNewspaper />, label: "News" },
        { icon: <GoTrophy />, label: "Sports" },
        { icon: <SlGraduation />, label: "Courses" },
        { icon: <PiCoatHanger />, label: "Fashion & Beauty" },
        { icon: <TbBrandApplePodcast />, label: "Podcasts" },
    ];

    // Logic to slice the array based on whether "Show More" is clicked in Explore section
    const visibleExplore = isExpanded ? exploreItems : exploreItems.slice(0, 3);

    return (
        <>
            {/* MAIN SIDEBAR CONTAINER */}
            <aside className={`fixed left-0 transition-all duration-200 ease-in-out overflow-y-auto custom-scrollbar bg-white
                ${isOpen
                    ? "w-60 px-3 top-0 h-screen z-60 shadow-xl"
                    : "w-20 px-1 h-[calc(100vh-56px)] z-50"
                }`}>

                {/* SIDEBAR HEADER: Only visible when open (contains Logo and Burger) */}
                {isOpen && (
                    <div className="sticky flex items-center gap-4 h-16 px-1 top-0 bg-white z-10">
                        <button onClick={toggleSidebar} className="cursor-pointer p-2 hover:bg-gray-100 rounded-full text-2xl">
                            <HiMenu />
                        </button>
                        <div className="flex items-center gap-1 cursor-pointer">
                            <AiFillYoutube className="text-red-600 text-3xl" />
                            <span className="font-bold text-xl tracking-tighter">YouTube<sup className="text-[12px] font-medium text-gray-600"> IN</sup></span>
                        </div>
                    </div>
                )}

                {/* CORE NAVIGATION SECTION */}
                <Link to="/"><SidebarItem icon={<IoMdHome />} label="Home" isOpen={isOpen} active className="top-14" /></Link>
                <SidebarItem icon={<SiYoutubeshorts />} label="Shorts" isOpen={isOpen} />
                <SidebarItem icon={<MdOutlineSubscriptions />} label="Subscriptions" isOpen={isOpen} />

                <hr className={`my-3 border-gray-200 ${!isOpen && "hidden"}`} />

                {currentUser && isOpen ? (
                    <div>
                        <div className="flex items-center rounded-lg cursor-pointer transition-colors flex-row gap-5 p-2 px-3 hover:bg-gray-100">
                            <button className="font-bold">You &gt;</button>
                        </div>
                        <SidebarItem icon={<LuHistory />} label="History" isOpen={isOpen} />
                        <SidebarItem icon={<MdOutlinePlaylistPlay />} label="Playlists" isOpen={isOpen} />
                        <SidebarItem icon={<CiYoutube />} label="Your videos" isOpen={isOpen} />
                        <SidebarItem icon={<SlGraduation />} label="Your courses" isOpen={isOpen} />
                        <SidebarItem icon={<MdOutlineWatchLater />} label="Watch later" isOpen={isOpen} />
                        <SidebarItem icon={<AiOutlineLike />} label="Liked videos" isOpen={isOpen} />

                        <hr className="my-3 border-gray-200" />
                        <div className="flex items-center rounded-lg cursor-pointer transition-colors flex-row gap-5 p-2 px-3 hover:bg-gray-100">
                            <button className="font-bold">Subsriptions &gt;</button>
                            {/* We will add subscribe list */}
                        </div>
                    </div>
                ) : (
                    <>
                        <SidebarItem icon={<FaRegCircleUser />} label="You" isOpen={isOpen} />
                        {isOpen && (
                            <>
                                <SidebarItem icon={<LuHistory />} label="History" isOpen={isOpen} />
                                <hr className="my-3 border-gray-200" />
                                <div className="px-3 py-1">
                                    <p className="text-sm leading-tight">Sign in to like videos, comment, and subscribe.</p>
                                    <button className="mt-3 flex items-center gap-2 text-blue-600 border border-gray-300 px-3 py-1.5 rounded-full hover:bg-blue-100/50 font-medium text-sm">
                                        <FaRegCircleUser className="text-xl" /> Sign in
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )
                }

                <hr className="my-3 border-gray-200" />

                {/* EXPLORE SECTION: Only fully active when Sidebar is open */}
                {isOpen && (
                    <>
                        <p className="px-3 py-2 font-semibold text-base">Explore</p>
                        {visibleExplore.map((item, idx) => (
                            <SidebarItem key={idx} icon={item.icon} label={item.label} isOpen={isOpen} />
                        ))}

                        {/* TOGGLE: Show More / Show Less */}
                        <div onClick={() => setIsExpanded(!isExpanded)}>
                            <SidebarItem
                                icon={isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                                label={isExpanded ? "Show less" : "Show more"}
                                isOpen={isOpen}
                            />
                        </div>

                        <hr className="my-3 border-gray-200" />
                        <p className="px-3 py-2 font-semibold text-base">More from YouTube</p>
                        <SidebarItem icon={<AiFillYoutube className="text-red-600" />} label="YouTube Premium" isOpen={isOpen} />
                        <SidebarItem icon={<SiYoutubemusic className="text-red-600" />} label="YouTube Music" isOpen={isOpen} />
                        <SidebarItem icon={<SiYoutubekids className="text-red-600" />} label="YouTube Kids" isOpen={isOpen} />

                        <hr className="my-3 border-gray-200" />
                        <SidebarItem icon={<IoSettingsOutline />} label="Settings" isOpen={isOpen} />
                        <SidebarItem icon={<CiFlag1 />} label="Report history" isOpen={isOpen} />
                        <SidebarItem icon={<IoIosHelpCircleOutline />} label="Help" isOpen={isOpen} />
                        <SidebarItem icon={<MdOutlineFeedback />} label="Send feedback" isOpen={isOpen} />

                        <hr className="my-3 border-gray-200" />

                        {/* FOOTER: Legal and About links */}
                        <div className="px-3 py-2 text-[13px] font-semibold text-[#606060] leading-tight">
                            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                                <span className="cursor-pointer">About</span>
                                <span className="cursor-pointer">Press</span>
                                <span className="cursor-pointer">Copyright</span>
                                <span className="cursor-pointer">Contact us</span>
                                <span className="cursor-pointer">Creators</span>
                                <span className="cursor-pointer">Advertise</span>
                                <span className="cursor-pointer">Developers</span>
                            </div>
                            <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-3">
                                <span className="cursor-pointer">Terms</span>
                                <span className="cursor-pointer">Privacy</span>
                                <span className="cursor-pointer">Policy & Safety</span>
                                <span className="cursor-pointer">How YouTube works</span>
                                <span className="cursor-pointer">Test new features</span>
                            </div>
                            <p className="mt-4 font-normal text-[#909090] text-[12px]">© 2025 Google LLC</p>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default Sidebar;