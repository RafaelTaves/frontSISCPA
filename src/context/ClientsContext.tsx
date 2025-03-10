"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface Cliente {
    cpf: string;
    name: string;
    phone: string;
    id_client: number;
}

interface ClientsContextType {
  clientes: Cliente[] | null;
  setClientes: (clients: Cliente[]) => void;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export function ClientsProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[] | null>(null);

  // ✅ Salva a lista de clientes no localStorage sempre que for atualizada
  useEffect(() => {
    if (clientes) {
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }
  }, [clientes]);

  // ✅ Carrega a lista do localStorage ao iniciar a aplicação
  useEffect(() => {
    const storedClients = localStorage.getItem("clientes");
    if (storedClients) {
      setClientes(JSON.parse(storedClients));
    } else {
      fetchClientes(); // Busca da API caso não tenha no localStorage
    }
  }, []);

  // ✅ Função para buscar clientes da API se necessário
  async function fetchClientes() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await fetch("http://127.0.0.1:8000/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erro ao buscar clientes");

      const data: Cliente[] = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  }

  return (
    <ClientsContext.Provider value={{ clientes, setClientes }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) throw new Error("useClients must be used within a ClientsProvider");
  return context;
}
