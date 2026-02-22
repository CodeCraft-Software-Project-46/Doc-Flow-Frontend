// Configuration Page — will be built in Steps 5 and 6
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";
import ChartTable from "../../components/AnalyticsComponents/ChartTable";

import {DEFAULT_CHARTS} from "./dummyData";
import type { CustomChart } from "./chartTypes";

export function ConfigurationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>("/configuration");
  const [charts, setCharts] = useState<CustomChart[]>(DEFAULT_CHARTS);

  const navigate = useNavigate();   // ✅ must add
  const location = useLocation();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

function handleDelete(id: number) {
  setCharts(prev => prev.filter(c => c.id !== id));
}

function handleEdit(chart: CustomChart) {
  console.log("Edit chart:", chart);
}
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
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          currentPage={selectedKey}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Page heading */}
            <div className="p-6 border-b border-slate-100">
              <h1 className="text-xl font-bold text-slate-900">
                Chart Configuration
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Create and manage custom charts for Overall Dashboard and Workflow Analytics
              </p>
            </div>

            {/* Top bar */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <span className="font-semibold text-slate-900">
                Configured Charts
              </span>
              <button
                onClick={() => console.log("Open create modal")}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                + Create Chart
              </button>
            </div>

            {/* Chart table */}
            <ChartTable
              charts={charts}       // ✅ use state here
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
}