import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const navigate = useNavigate();

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }
}, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="w-80 p-4">
        <Outlet />
      </main>
    </div>
  );
}