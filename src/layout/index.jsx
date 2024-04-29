import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const Layout = () => {
    return (
        <div className="bg-white flex h-full">
            <Sidebar />
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </div>
    )
}

export default Layout