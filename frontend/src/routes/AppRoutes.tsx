import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../layout/AppLayout";
import Clients from "../pages/clientes/Clients";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* rota pública */}
      <Route path="/login" element={<Login />} />

      {/* rotas protegidas */}
      {user ? (
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/clients" element={<Clients />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
