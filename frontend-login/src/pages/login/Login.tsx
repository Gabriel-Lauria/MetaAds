// src/pages/login/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login as loginApi } from "../../services/api";
import "./Login.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario || !senha) return setErro("Preencha usuário e senha");

    setLoading(true);
    setErro("");

    try {
      const data = await loginApi(usuario, senha);

      setUser({
        usuarioNome: data.usuario,
        role: data.role,
        token: data.token,
      });

      navigate("/");
    } catch (err) {
      setErro("Usuário ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Painel esquerdo visual */}
      <div className="login-left">
        <div className="brand">
          <span className="material-symbols-outlined">insights</span>
          <h1>AdOptimize</h1>
        </div>
        <div className="promo">
          <h2>Suas campanhas, simplificadas e otimizadas</h2>
          <p>Gerencie e otimize seus anúncios do Meta com facilidade.</p>
        </div>
        <div className="copyright">© 2024 AdOptimize. Todos os direitos reservados.</div>
      </div>

      {/* Painel direito do formulário */}
      <div className="login-right">
        <div className="login-form-wrapper">
          <h2>Acesse sua conta</h2>
          {erro && <p className="error">{erro}</p>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="usuario">Usuário</label>
              <input
                id="usuario"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
