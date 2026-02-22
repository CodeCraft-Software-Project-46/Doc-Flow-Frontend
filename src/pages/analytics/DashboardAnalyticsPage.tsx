import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import StatCard from "../../components/AnalyticsComponents/StatCard";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";
import SLADonut from "../../components/AnalyticsComponents/SLADonut";
import SLATrend from "../../components/AnalyticsComponents/SLATrend";
import BottleneckSteps from "../../components/AnalyticsComponents/BottleneckSteps";
import UserSLAList from "../../components/AnalyticsComponents/UserSLAList";

type Tab = "overall" | "workflow";

export function DashboardAnalyticsPage() {
  const [tab, setTab] = useState<Tab>("overall");
  const [timeRange, setTimeRange] = useState("30d");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>("/analytics");
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
          <div className="bg-slate-100 font-sans rounded-lg">

      {/* ── Tab Bar ── */}
      <div className="bg-white border-b border-slate-200 px-8 flex rounded-t-lg">
        {(["overall", "workflow"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              tab === t
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t === "overall" ? "Overall Dashboard" : "Workflow Analytics"}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/*OVERALL DASHBOARD TAB*/}
        {tab === "overall" && (
          <div className="space-y-5">

            {/* Page heading */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">Overall Dashboard</h2>
              <p className="text-sm text-slate-500 mt-1">
                System-wide KPI monitoring across all workflows
              </p>
            </div>

            {/* Top stat cards — always live, not affected by time range */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon="📄"
                value="48"
                label="Running Documents"
                sub="Currently Active"
                color="#3b82f6"
              />
              <StatCard
                icon="⚠️"
                value="7"
                label="Active Overdue Tasks"
                sub="Requires Immediate Attention"
                color="#ef4444"
              />
            </div>

            {/* Time range filter bar */}
            <div className="bg-white rounded-xl shadow-sm px-5 py-3 flex items-center gap-3">
              <span className="text-sm text-slate-500 font-medium">Time Range:</span>
              <select
                title="Select time range filter"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-700 outline-none"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <span className="text-xs text-slate-400">— Filters all sections below</span>
            </div>

            {/* Period metric cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Completed */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-4xl font-bold text-slate-900">32</div>
                    <div className="text-sm text-slate-500 mt-1">Completed (Selected Period)</div>
                    <div className="text-xs text-slate-400">vs previous period</div>
                  </div>
                  <span className="text-green-500 text-sm font-semibold">▲ +8%</span>
                </div>
              </div>

              {/* SLA Compliance */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-4xl font-bold text-slate-900">80%</div>
                    <div className="text-sm text-slate-500 mt-1">SLA Compliance (Selected Period)</div>
                    <div className="text-xs text-slate-400">Overall compliance rate</div>
                  </div>
                  <span className="text-red-500 text-sm font-semibold">▼ -1%</span>
                </div>
              </div>
            </div>

            {/* SLA Charts */}
            <div className="grid grid-cols-2 gap-4">
              <SLADonut />
              <SLATrend />
            </div>

            {/* Additional Analysis Charts */}
            <div className="grid grid-cols-2 gap-4">
              <BottleneckSteps />
              <UserSLAList />
            </div>
          </div>
        )}

        {tab === "workflow" && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-900">Workflow Analytics</h2>
            <p className="text-slate-500">Workflow Analytics — coming soon</p>
          </div>
        )}
        </div>
          </div>
        </main>
      </div>
    </div>
  );
}