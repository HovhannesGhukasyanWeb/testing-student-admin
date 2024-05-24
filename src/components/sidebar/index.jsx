import { useDispatch, useSelector } from 'react-redux';
import { sidebarPages } from '../../helpers/sidebarPages';
import SidebarItem from './sidebar-item';

const Sidebar = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const sidebar = dispatch(sidebarPages(user.permissions));

    return (
        <div className="border-r border-lightgray h-full sticky top-0">
            <div className="bg-white w-64 h-full">
                <div className="p-3">
                    <ul className="mt-2 space-y-4">
                        {sidebar.map((sidebarItem) => <SidebarItem key={sidebarItem.title} item={sidebarItem} />)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar