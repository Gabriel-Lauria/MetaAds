// frontend/src/pages/clients/MetaConnect.tsx
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MetaConnect.scss"

interface MetaConnectProps {
  clienteId: number;
  jwt: string;
  onConnected: () => void;
}

// Substitua pelo App ID do seu app no Meta Developers
const APP_ID = "1365001228003843";
// O REDIRECT_URI deve bater com o configurado no app da Meta
const REDIRECT_URI = "http://localhost:3000/meta/callback";

const MetaConnect: React.FC<MetaConnectProps> = ({ clienteId, jwt, onConnected }) => {
  const navigate = useNavigate();

  // Abrir popup para autorizar o app na Meta
  const handleConnect = () => {
    const oauthUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=ads_management`;
    window.open(oauthUrl, "_blank", "width=600,height=700");
  };

  // Função para salvar o token no backend
  const saveToken = async (accessToken: string, adAccountId: string) => {
    try {
      await axios.post(
        `http://localhost:5039/api/clientes/${clienteId}/meta`,
        { accessToken, adAccountId, expiresAt: null },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      onConnected();
      alert("Meta conectada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao salvar token:", error);
      alert("Erro ao salvar token. Veja o console.");
    }
  };

  // Captura o token do callback via URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const adAccountId = params.get("ad_account_id");

    if (accessToken && adAccountId) {
      saveToken(accessToken, adAccountId);
      // Limpar query params
      navigate("/clients", { replace: true });
    }
  }, [navigate]);

  return <button onClick={handleConnect}>Conectar Meta</button>;
};

export default MetaConnect;
