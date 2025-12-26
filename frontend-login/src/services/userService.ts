import axios from "axios";
import { User } from "../pages/users/types";

const API_URL = "http://localhost:5039/api/usuarios";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL);
  return response.data;
};

export const createUser = async (data: {
  usuarioNome: string;
  senha: string;
  role: string;
}) => {
  await axios.post(API_URL, data);
};

export const updateUser = async (
  id: number,
  data: {
    usuarioNome: string;
    role: string;
    novaSenha?: string;
  }
) => {
  await axios.put(`${API_URL}/${id}`, data);
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
