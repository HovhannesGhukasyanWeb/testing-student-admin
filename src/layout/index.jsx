import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const Layout = () => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="bg-white flex h-full">
                <Sidebar />
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}

export default Layout