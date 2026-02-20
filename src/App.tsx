import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

// Layouts
import { RootLayout } from "./components/RootLayout";


import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { Dashboard } from "./pages/dashboard/DashboardPage.tsx";
import { DocumentPage } from "./pages/documents/DocumentPage";
import { WorkflowPage } from "./pages/workflow/WorkFlowPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { AuditPage } from "./features/admin/pages/AuditPage";
import { UserManagementPage } from "./features/admin/pages/UserManagementPage";
import {DashboardBuilder} from "./pages/dashboard/DshboardBuilder.tsx";

export default function App() {
    const routes = createBrowserRouter([
        // 1. Login Route
        { path: "/", element: <LoginPage /> },

        // 2. Protected App Routes
        {
            element: <RootLayout />, // Contains the Sidebar & Outlet
            children: [
                {
                    element: <ProtectedRoute />, // Checks if user is logged in
                    children: [
                        // Use absolute paths to be safe
                        { path: "/dashboard", element: <Dashboard /> },
                        { path: "/document", element: <DocumentPage /> },
                        { path: "/workflow", element: <WorkflowPage /> },
                        { path: "/settings", element: <SettingsPage /> },
                        
                        // Admin Routes
                        { path: "/audit-logs", element: <AuditPage /> },
                        { path: "/users", element: <UserManagementPage /> },
                        { path: "/dashboardBuilder", element: <DashboardBuilder /> },
                    ]
                }
            ]
        },

        { path: "*", element: <Navigate to="/dashboard" replace /> }
    ]);

    return <RouterProvider router={routes} />;
}