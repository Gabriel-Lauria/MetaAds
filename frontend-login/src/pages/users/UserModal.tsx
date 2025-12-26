import React, { useEffect, useState } from "react";
import { User } from "./types";
import { createUser, updateUser } from "../../services/userService";
import "./UserModal.scss";


interface Props {
  user: User | null;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ user, onClose }) => {
  const [usuarioNome, setUsuarioNome] = useState("");
  const [role, setRole] = useState("cliente");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (user) {
      setUsuarioNome(user.usuarioNome);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (user) {
      await updateUser(user.id, {
        usuarioNome,
        role,
        novaSenha: senha || undefined,
      });
    } else {
      await createUser({
        usuarioNome,
        senha,
        role,
      });
    }

    onClose();
  };

  return (
    <div className="modal">
      <h3>{user ? "Editar Usuário" : "Novo Usuário"}</h3>

      <input
        placeholder="Usuário"
        value={usuarioNome}
        onChange={e => setUsuarioNome(e.target.value)}
      />

      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="cliente">Cliente</option>
      </select>

      <button onClick={handleSubmit}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default UserModal;
