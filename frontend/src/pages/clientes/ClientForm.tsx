import React, { useState } from "react";
import { criarCliente } from "../../api/clientes";
import "./ClientForm.scss";

interface Props {
  jwt: string;
  onCreated: () => void;
}

const ClientForm: React.FC<Props> = ({ jwt, onCreated }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await criarCliente(nome, email, jwt);
      setNome("");
      setEmail("");
      onCreated();
    } catch (err) {
      alert("Erro ao criar cliente. Verifique o backend e o token.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Salvar Cliente</button>
    </form>
  );
};

export default ClientForm;
