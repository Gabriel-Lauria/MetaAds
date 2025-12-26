// src/pages/clients/CampaignForm.tsx
import React, { useState } from "react";
import { criarCampanha } from "../../api/meta";
import "./CampaignForm.scss"

interface Props {
  jwt: string;
  metaToken: string;
}

const CampaignForm: React.FC<Props> = ({ jwt, metaToken }) => {
  const [nome, setNome] = useState("");
  const [objetivo, setObjetivo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await criarCampanha(jwt, metaToken, nome, objetivo);
    setNome("");
    setObjetivo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da Campanha"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Objetivo"
        value={objetivo}
        onChange={e => setObjetivo(e.target.value)}
        required
      />
      <button type="submit">Criar Campanha</button>
    </form>
  );
};

export default CampaignForm;
