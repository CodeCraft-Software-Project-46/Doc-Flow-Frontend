import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

// Layouts
import { RootLayout } from "./components/RootLayout";

// Components & Features
// Note: Ensure you have created this file in src/features/auth/components/
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";

// Pages (Existing)
import { LoginPage } from "./features/auth/pages/LoginPage";
import { Dashboard } from "./pages/DashboardPage";
import { DocumentPage } from "./pages/documents/DocumentPage";
import { WorkflowPage } from "./pages/workflow/WorkFlowPage";
import { SettingsPage } from "./pages/settings/SettingsPage";








// Pages (Future - Member 1 Work)

import { AuditPage } from "./features/admin/pages/AuditPage";
import { UserManagementPage } from "./features/admin/pages/UserManagementPage";

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
                    ]
                }
            ]
        },

        // 3. Catch-All Route (Fixes 404s)
        // If user types a wrong URL, send them to Dashboard (which redirects to login if needed)
        { path: "*", element: <Navigate to="/dashboard" replace /> }
    ]);

    return <RouterProvider router={routes} />;
}