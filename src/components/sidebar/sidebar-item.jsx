import { ChevronLeft, icons } from 'lucide-react'
import { useEffect, useState } from 'react'

import PropTypes from 'prop-types';

export default function SidebarItem({ item }) {
    const [isSidebarItemOpen, setIsSidebarItemOpen] = useState(false);
    const currentPath = window.location.pathname;

    useEffect(() => {
        if (item.items.some((subItem) => subItem.path == currentPath)) {
            setIsSidebarItemOpen(true);
        }
    }, [currentPath, item.items]);

    return (
        <li>
            <div onClick={() => setIsSidebarItemOpen(!isSidebarItemOpen)} className={`cursor-pointer flex items-center w-full justify-between hover:bg-[#F3F3F3] p-2 pl-4 rounded-sm ${isSidebarItemOpen && "bg-[#F3F3F3]"}`}>
                <span>{item.title}</span>
                <ChevronLeft className={`w-4 h-4 ${isSidebarItemOpen ? "-rotate-90 transition duration-150" : ""}`} />
            </div>
            <ul className={`m-4 ml-6 space-y-4 transition duration-75 ${isSidebarItemOpen ? "h-full opacity-100" : "h-0 opacity-0"}`}>
                {item.items.map((subItem) => {
                    const Icon = icons[subItem.icon];
                    return (
                        <li key={subItem.title}>
                            <a href={subItem.path} className={`hover:scale-110 transition-all duration-75 w-full flex items-center gap-2 ${subItem.path == currentPath && "scale-110"}`}>
                                <Icon size="1.25em" name={subItem.icon} />
                                <span>{subItem.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

SidebarItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired,
                icon: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
};
