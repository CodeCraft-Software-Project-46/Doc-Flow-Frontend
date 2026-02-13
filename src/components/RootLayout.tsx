import { useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";

import { Dashboard } from "../pages/DashboardPage";
import { DocumentPage } from "../pages/documents/DocumentPage";
import { WorkflowPage } from "../pages/workflow/WorkFlowPage";
import { SettingsPage } from "../pages/settings/SettingsPage";

export function RootLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleMenuClick = (key: string) => {
        setSelectedKey(key);
        navigate(key);
        setIsSidebarOpen(false);
    };

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleLogout = () => {
        setIsModalOpen(true);
    };

    const confirmLogout = () => {
        console.log("Logging out...");
        setIsModalOpen(false);
        navigate("/"); // optional redirect
    };

    const cancelLogout = () => {
        setIsModalOpen(false);
    };

    const currentPage = selectedKey.replace("/", "") || "Dashboard";

    return (
        <div className="flex h-screen bg-gray-50">

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
                selectedKey={selectedKey}
                onMenuClick={handleMenuClick}
                onLogout={handleLogout}
            />

            {/* Main Column */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <Header
                    onToggleSidebar={handleToggleSidebar}
                    currentPage={currentPage}
                />

                {/* Content Area */}
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full">

                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/document" element={<DocumentPage />} />
                            <Route path="/workflow" element={<WorkflowPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                        </Routes>

                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>

            {/* Logout Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelLogout}
                                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
