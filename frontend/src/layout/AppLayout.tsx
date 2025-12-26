// src/layout/AppLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/dashboard/Sidebar";
import "./AppLayout.scss";

const AppLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
