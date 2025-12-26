// src/api/meta.ts
import axios from "axios";

const META_API = "http://localhost:5039/api/meta";

// Criar campanha
export const criarCampanha = async (
  jwt: string,
  metaToken: string,
  nome: string,
  objetivo: string
) => {
  const { data } = await axios.post(
    `${META_API}/campaigns`,
    { name: nome, objective: objetivo },
    {
      headers: { Authorization: `Bearer ${jwt}`, "X-Meta-Access-Token": metaToken },
    }
  );
  return data;
};

// Conectar Meta
export const conectarMeta = async (
  clienteId: number,
  adAccountId: string,
  accessToken: string,
  expiresAt: string,
  jwt: string
) => {
  const { data } = await axios.post(
    `${META_API}/metaIntegration`,
    { clienteId, adAccountId, accessToken, expiresAt },
    { headers: { Authorization: `Bearer ${jwt}` } }
  );
  return data;
};
