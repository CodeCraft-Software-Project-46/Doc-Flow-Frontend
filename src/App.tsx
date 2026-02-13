
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/DashboardPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import {DocumentPage} from "./pages/documents/DocumentPage.tsx";
import {WorkflowPage} from "./pages/workflow/WorkFlowPage.tsx";
import {SettingsPage} from "./pages/settings/SettingsPage.tsx";
import SignInPage from "./pages/signIn-Signup/SignInPage.tsx";


export default function App() {
   const isAuthenticated=true;
    const routes = createBrowserRouter([
        { path: "/", element: <SignInPage/> },
        {
            path: '/',
            element: <RootLayout/>,
            children:[
                {path:'/dashboard',element: isAuthenticated ? <Dashboard/> : <SignInPage/>},
                {path:'/document',element:<DocumentPage/>},
                {path:'/workflow',element:<WorkflowPage/>},
                {path:'/settings',element:<SettingsPage/>},

            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={routes}/>
        </>
    )
}