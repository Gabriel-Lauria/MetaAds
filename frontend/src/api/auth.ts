const API_URL = 'https://localhost:5001/api/Login'; // ajuste a porta do seu backend

export interface LoginData {
  usuario: string;
  senha: string;
}

export async function login(data: LoginData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error('Usuário ou senha inválidos');
  return res.json();
}
