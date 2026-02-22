import React, { useState } from "react";
import DashboardStats from "../../components/DashboardBuilderComponents/DashboardStats";
import {DashboardList} from "../../components/DashboardBuilderComponents/DashboardList.tsx";
import {DashboardFilters} from "../../components/DashboardBuilderComponents/DashboardFilter.tsx";
export interface Dashboard {
    id: number;
    name: string;
    description: string;
    role: string;
    widgets: number;
    status: "Active" | "Draft" | "Disabled";
    isDefault?: boolean;
    updatedAt: string;
}

export const DashboardBuilder: React.FC = () => {
    // samples
    const [dashboards, setDashboards] = useState<Dashboard[]>([
        {
            id: 1,
            name: "Staff Dashboard",
            description: "Default dashboard for staff and initiators",
            role: "Staff / Initiator",
            widgets: 6,
            status: "Active",
            isDefault: true,
            updatedAt: "2/19/2026",
        },
        {
            id: 2,
            name: "Approver Dashboard",
            description: "Default dashboard for approvers",
            role: "Approver",
            widgets: 6,
            status: "Active",
            isDefault: true,
            updatedAt: "2/16/2026",
        },
    ]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const filteredDashboards = dashboards.filter((dashboard) => {
        const matchesSearch = dashboard.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            status === "All" || dashboard.status === status;

        return matchesSearch && matchesStatus;
    });

    // Action Handlers
    const handleEdit = (id: number) => {
        console.log("Edit", id);
    };

    const handleView = (id: number) => {
        console.log("View", id);
    };

    const handleDuplicate = (dashboard: Dashboard) => {
        const newDashboard = {
            ...dashboard,
            id: Date.now(),
            name: dashboard.name + " Copy",
        };
        setDashboards([...dashboards, newDashboard]);
    };

    const handleDelete = (id: number) => {
        setDashboards(dashboards.filter((d) => d.id !== id));
    };

    const handleDownload = (id: number) => {
        console.log("Download", id);
    };

    return (
        <div className="p-0 bg-gray-50 min-h-screen space-y-6">

            <div className="flex justify-between items-center">
                <DashboardFilters
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                />


                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Create Dashboard
                </button>
            </div>

            {/* Stats */}
            <DashboardStats dashboards={filteredDashboards} />

            {/* Dashboard List */}
            <DashboardList
                dashboards={filteredDashboards}
                onEdit={handleEdit}
                onView={handleView}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                onDownload={handleDownload}
            />
        </div>
    );
};

