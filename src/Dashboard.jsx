import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function DashboardLayout() {
    

    
    return (
        <div>
            {/* Persistent Navigation Sidebar */}
            <div className="dashboard-container">
                <Sidebar />

                {/* Main Content Area */}
                <main className="w-80 p-4">
                    {/* Child components (Profile or Settings) will inject right here */}
                    <Outlet />
                </main>

                 <ToastContainer />

            </div>
        </div>
    );
}