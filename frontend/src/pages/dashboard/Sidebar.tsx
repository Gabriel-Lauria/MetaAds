import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import "./Sidebar.scss";

import dashboardIcon from "../../assets/img/icon/dashboard.png";
import usersIcon from "../../assets/img/icon/users.png";
import userIcon from "../../assets/img/icon/adicionar-usuario.png";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  /* 🔑 aplica/remove classe no body */
  useEffect(() => {
    document.body.classList.toggle("sidebar-collapsed", collapsed);
  }, [collapsed]);

  return (
    <aside className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="logo">Ads Admin</div>

        <div className="username">
          <img src={userIcon} alt="Usuário" className="user-icon" />
          {!collapsed && (
            <span className="username-text">
              {user?.usuarioNome || "Usuário"}
            </span>
          )}
        </div>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        <Link to="">
          <img src={dashboardIcon} alt="Dashboard" className="nav-icon" />
          {!collapsed && <span className="nav-text">Dashboard</span>}
        </Link>

        <Link to="/users">
          <img src={usersIcon} alt="Usuários" className="nav-icon" />
          {!collapsed && <span className="nav-text">Usuários</span>}
        </Link>

        <Link to="/clients">
          <img src={usersIcon} alt="Clientes" className="nav-icon" />
          {!collapsed && <span className="nav-text">Clientes</span>}
        </Link>
      </nav>

      {/* LOGOUT */}
      <button className="logout-button" onClick={logout}>
        {!collapsed && <span className="nav-text">Sair</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
