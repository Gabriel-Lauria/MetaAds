import React, { useEffect, useState } from "react";
import { listarClientes, excluirCliente } from "../../api/clientes";
import ClientForm from "./ClientForm";
import MetaForm from "./MetaForm";
import CampaignForm from "./CampaignForm";
import { useAuth } from "../../context/AuthContext";
import "./Clients.scss";

interface Cliente {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
  metaIntegration: any | null;
}

const Clients: React.FC = () => {
  const { user } = useAuth();
  const jwt = user?.token || "";

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showClientForm, setShowClientForm] = useState(false);

  const fetchClientes = async () => {
    try {
      const data = await listarClientes(jwt);
      setClientes(data);
    } catch (err) {
      alert("Erro ao listar clientes. Verifique o backend e o token.");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await excluirCliente(id, jwt);
        fetchClientes();
      } catch (err) {
        alert("Erro ao excluir cliente. Verifique o backend e o token.");
      }
    }
  };

  return (
    <div className="clients-page">
      <h1>Clientes</h1>
      <button className="primary" onClick={() => setShowClientForm(true)}>
        Criar Cliente
      </button>

      {showClientForm && (
        <ClientForm
          jwt={jwt}
          onCreated={() => {
            setShowClientForm(false);
            fetchClientes();
          }}
        />
      )}

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <strong>{cliente.nome}</strong> ({cliente.email})
            <div className="cliente-actions">
              {!cliente.metaIntegration && (
                <MetaForm
                  jwt={jwt}
                  clienteId={cliente.id}
                  onConnected={fetchClientes}
                />
              )}
              {cliente.metaIntegration && (
                <CampaignForm
                  jwt={jwt}
                  metaToken={cliente.metaIntegration.accessToken}
                />
              )}
              <button
                className="excluir"
                onClick={() => handleDelete(cliente.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
