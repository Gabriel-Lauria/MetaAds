import React, { useState, useEffect } from "react";

interface User {
  id?: number;
  username: string;
  email: string;
}

interface UserFormProps {
  user?: User | null;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: user?.id, username, email });
  };

  return (
    <div className="user-form-overlay">
      <div className="user-form">
        <h2>{user ? "Editar Usuário" : "Novo Usuário"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="buttons">
            <button type="submit">{user ? "Salvar" : "Criar"}</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
