"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import TableConsultas from "../components/tables/TableConsultas";
import getSubscriptionByClientId from "../functions/getSubscriptionByClientId";
import setSubscriptionStatus from "../functions/setSubcriptionStatus";
import BadNotification from "../components/notifications/badNotification";
import ClientesSelect from "../components/selects/ClientsSelect";
import { useClients } from "@/context/ClientsContext";

interface Cliente {
  cpf: string;
  name: string;
  phone: string;
  id_client: number;
}

const BASE_URL = "http://127.0.0.1:8000"

export default function Consultas() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchedClient, setSearchedClient] = useState<Cliente>()
  const [searchedEndDate, setSearchedEndDate] = useState<Date>()
  const [active, setActive] = useState<boolean>(false)
  const [showBadNotificationClient, setShowBadNotificationClient] = useState<boolean>(false)
  const { clientes } = useClients();

  useEffect(() => {
    getClientInfo()
  }, [searchedClient])

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${BASE_URL}/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
        setLoading(false)
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/');
      }
    };

    verifyToken();
  }, [router]);

  if (loading) {
    return <div>{null}</div>;
  }

  async function getClientInfo() {
    if (searchedClient) {
      const subscription = await getSubscriptionByClientId(searchedClient.id_client);

      if (subscription) {
        const endDate = new Date(subscription.end_date);
        setSearchedEndDate(endDate);

        const status = setSubscriptionStatus(endDate);
        setActive(status);
      }
    } else return

  }

  function handleSelectChange(selectedClient: Cliente | null) {
    if (selectedClient) {
      setSearchedClient(selectedClient);
    }
  }

  function handleCloseNotification() {
    setShowBadNotificationClient(false)
  }
  return (
    <div className="min-h-screen max-h-screen w-full flex flex-col md:flex-row bg-gray-200">
      <SideBar />
      <div className="w-full flex-col overflow-y-auto">

        <Header pageName="Consultas" />

        <div className="w-full h-auto flex flex-col items-center mt-10 lg:mt-32">
          <BadNotification
            show={showBadNotificationClient}
            title="Cliente Não Encontrado!"
            desc="Tente novamente com outro formato de busca"
            onClose={handleCloseNotification}
          />
          <div className="w-3/4">
            <div className="flex gap-x-4">
              <label htmlFor="search" className="block font-inter text-lg font-semibold flex text-black items-center">
                Digite o NOME COMPLETO do cliente
              </label>
            </div>
            <div className="mt-6">
              <div className="flex gap-x-4">
                {clientes !== null ?
                <ClientesSelect clientes={clientes} onChange={handleSelectChange} />
                : ""}
              </div>
            </div>
            <div className="mt-6">
              {searchedClient && searchedEndDate ?
                <TableConsultas
                  name={searchedClient.name}
                  status={active}
                  end_date={searchedEndDate}
                /> : ""}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}