import axios from "axios";

const API = "http://localhost:5039/api/clientes";

export const listarClientes = async (jwt: string) => {
  const { data } = await axios.get(API, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return data;
};

export const criarCliente = async (nome: string, email: string, jwt: string) => {
  const { data } = await axios.post(
    API,
    { nome, email },
    { headers: { Authorization: `Bearer ${jwt}` } }
  );
  return data;
};

export const excluirCliente = async (id: number, jwt: string) => {
  const { data } = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return data;
};
