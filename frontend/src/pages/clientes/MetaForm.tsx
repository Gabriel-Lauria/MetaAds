// src/pages/clients/MetaForm.tsx
import React, { useState } from "react";
import { conectarMeta } from "../../api/meta";

interface Props {
  jwt: string;
  clienteId: number;
  onConnected: () => void;
}

const MetaForm: React.FC<Props> = ({ jwt, clienteId, onConnected }) => {
  const [accessToken, setAccessToken] = useState("");
  const [adAccountId, setAdAccountId] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await conectarMeta(clienteId, adAccountId, accessToken, expiresAt, jwt);
    setAccessToken("");
    setAdAccountId("");
    setExpiresAt("");
    onConnected();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Access Token"
        value={accessToken}
        onChange={e => setAccessToken(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ad Account ID"
        value={adAccountId}
        onChange={e => setAdAccountId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Expires At"
        value={expiresAt}
        onChange={e => setExpiresAt(e.target.value)}
        required
      />
      <button type="submit">Conectar Meta</button>
    </form>
  );
};

export default MetaForm;
