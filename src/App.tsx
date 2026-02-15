import { createBrowserRouter, RouterProvider } from "react-router";

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
        // 1. Public Routes (Accessible by anyone)
        { 
            path: "/", 
            element: <LoginPage /> 
        },

        // 2. Protected Routes (Require Login)
        {
            element: <RootLayout />, // Wraps the app with Sidebar/Header
            children: [
                {
                    element: <ProtectedRoute />, // 🔒 Checks authentication for all children
                    children: [
                        { path: "/dashboard", element: <Dashboard /> },
                        { path: "/document", element: <DocumentPage /> },
                        { path: "/workflow", element: <WorkflowPage /> },
                        { path: "/settings", element: <SettingsPage /> },
                        

                        { path: "/audit-logs", element: <AuditPage /> },
                        { path: "/users", element: <UserManagementPage /> },
                    ]
                }
            ]
        }
    ]);

    return <RouterProvider router={routes} />;
}