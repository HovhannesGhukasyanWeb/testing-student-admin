import sidebar from '../../constants/sidebar';
import SidebarItem from './sidebar-item';

const Sidebar = () => {
    return (
        <div className="border-r border-lightgray h-full">
            <div className="bg-white w-64 h-full">
                <div className="p-3">
                    <ul className="mt-2">
                        {sidebar.map((sidebarItem) => <SidebarItem key={sidebarItem.title} item={sidebarItem} />)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar