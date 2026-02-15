// ✅ FIX 1: Import Outlet, remove Route/Routes
import { Outlet, useLocation, useNavigate } from "react-router"; 
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";

// ✅ FIX 2: Removed unused Page imports (Dashboard, etc.) since App.tsx handles routing now.

export function RootLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    const handleMenuClick = (key: string) => {
        setSelectedKey(key);
        navigate(key);
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                selectedKey={selectedKey}
                onMenuClick={handleMenuClick}
                onLogout={() => {
                    localStorage.removeItem("isAuthenticated");
                    navigate("/");
                }}
            />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} currentPage={selectedKey} />
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 min-h-full">
                        {/* This is where the child routes (Dashboard, Documents) will render */}
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}