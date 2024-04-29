import sidebar from '../../constants/sidebar';
import SidebarItem from './sidebar-item';

const Sidebar = () => {
    return (
        <div className="h-full">
            <div className="bg-white w-64 h-full">
                <div className="p-6">
                    <h2 className="text-black text-xl font-semibold">Student Testing</h2>
                    <ul className="mt-6">
                        {sidebar.map((sidebarItem) => <SidebarItem key={sidebarItem.title} item={sidebarItem} />)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar