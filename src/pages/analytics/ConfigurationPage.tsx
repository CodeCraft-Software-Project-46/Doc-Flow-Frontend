// Configuration Page — will be built in Steps 5 and 6
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";

export function ConfigurationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>("/configuration");
  const navigate = useNavigate();
  const location = useLocation();

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
            <p className="text-slate-500">Configuration Page — coming soon</p>
          </div>
        </main>
      </div>
    </div>
  );
}