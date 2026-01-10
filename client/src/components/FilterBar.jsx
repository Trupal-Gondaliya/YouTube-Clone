import React, { useRef, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const FilterBar = ({ selectedFilterCategory, setSelectedFilterCategory }) => {
    // Reference to the scrollable container to access DOM properties like scrollLeft
    const scrollRef = useRef(null);

    // State to toggle the visibility of the navigation arrows
    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(true);

    const categories = [
        "All", "Lord", "Music", "Gaming", "Education", "Technology", "Film", "Animation",
        "Comedy", "Entertainment", "Vlogs", "Science", "News", "Politics",
        "Travel", "Pets", "Animals", "Health", "Sports", "Yoga", "Beauty", "Food",
        "Art", "Motivation", "Other"
    ];

    // Function to handle scrolling logic
    const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Show left button only if we have scrolled away from the start
        setShowLeftBtn(scrollLeft > 0);
        // Show right button if the hidden content on the right is greater than a small buffer (5px)
        setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 5);
    };

    const scroll = (direction) => {
        if (direction === "left") {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        } else {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <div className="bg-white border-b border-gray-100 dark:bg-black flex items-center px-4 sticky top-0 z-40 ">
            
            {/* Left Button */}
            {showLeftBtn && (
                <div className="absolute left-0 z-10 bg-linear-to-r from-white via-white to-transparent dark:from-black dark:via-black dark:text-white pr-10 h-full flex items-center">
                    <button 
                        onClick={() => scroll("left")}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors dark:hover:bg-neutral-700"
                    >
                        <MdChevronLeft size={28} />
                    </button>
                </div>
            )}

            {/* Category Container */}
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-3 overflow-x-auto no-scrollbar py-3 scroll-smooth items-center"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedFilterCategory(cat)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all border
                            ${selectedFilterCategory === cat 
                                ? "bg-black text-white border-black dark:bg-white dark:text-black" 
                                : "bg-gray-100 text-black border-transparent hover:bg-gray-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Right Button */}
            {showRightBtn && (
                <div className="absolute right-0 z-10 bg-linear-to-l from-white via-white to-transparent dark:from-black dark:via-black dark:text-white pl-10 h-full flex items-center">
                    <button 
                        onClick={() => scroll("right")}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors dark:hover:bg-neutral-700"
                    >
                        <MdChevronRight size={28} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterBar;