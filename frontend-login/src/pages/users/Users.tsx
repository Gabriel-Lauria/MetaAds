import React, { useEffect, useState } from "react";
import { User } from "./types";
import { getUsers, deleteUser } from "../../services/userService";
import UserModal from "./UserModal";
import "./Users.scss";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>Usuários</h2>
        <button
          className="primary"
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
        >
          Novo Usuário
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.usuarioNome}</td>
              <td>{u.role}</td>
              <td className="actions">
                <button
                  onClick={() => {
                    setEditingUser(u);
                    setShowModal(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="danger"
                  onClick={() => deleteUser(u.id).then(loadUsers)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserModal
          user={editingUser}
          onClose={() => {
            setShowModal(false);
            loadUsers();
          }}
        />
      )}
    </div>
  );
};

export default Users;
