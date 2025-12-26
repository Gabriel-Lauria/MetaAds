import axios from "axios";

const API_URL = "http://localhost:5039/api";

export const login = async (usuario: string, senha: string) => {
  const response = await axios.post(`${API_URL}/Login`, { usuario, senha });
  return response.data;
};
