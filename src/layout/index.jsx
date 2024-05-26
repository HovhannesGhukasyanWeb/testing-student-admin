import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { hasPagePermission } from "../helpers/route";
import { useSelector } from "react-redux";

const Layout = () => {
    const {user} = useSelector(state => state.user);

    hasPagePermission(location.pathname, user.permissions)
    return (
        <div className="h-full">
            <Navbar />
            <div className="bg-white flex" style={{ height: "calc(100% - 69px)" }}>
                <Sidebar />
                <Suspense fallback={null}>
                    <div className="h-full w-full max-h-full overflow-auto">
                        <Outlet />
                    </div>
                </Suspense>
            </div>
        </div>
    )
}

export default Layout