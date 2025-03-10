"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import TableConsultas from "../components/tables/TableConsultas";
import getClientByName from "../functions/getClientByName";
import getSubscriptionByClientId from "../functions/getSubscriptionByClientId";
import setSubscriptionStatus from "../functions/setSubcriptionStatus";
import BadNotification from "../components/notifications/badNotification";
import getClientByCpf from "../functions/getClientByCpf";

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
  const [selectedSearchMethod, setSelectedSearchMethod] = useState<string>("nome")
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchedClient, setSearchedClient] = useState<Cliente>()
  const [searchedEndDate, setSearchedEndDate] = useState<Date>()
  const [active, setActive] = useState<boolean>(false)
  const [showBadNotificationClient, setShowBadNotificationClient] = useState<boolean>(false)
  const [idSelectedClient, setIdSelectedClient] = useState<number>(0)

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
    let client
    if (selectedSearchMethod === "nome") {
      client = await getClientByName(searchInput);
    } else {
      client = await getClientByCpf(searchInput)
    }

    if (client === "erro") {
      setShowBadNotificationClient(true)
      setSearchedEndDate(undefined)
      setSearchedClient(undefined)
      return
    }

    setSearchedClient(client);

    const end_date = await getSubscriptionByClientId(client.id_client);

    if (end_date) {
      const endDate = new Date(end_date);
      setSearchedEndDate(endDate);

      const status = setSubscriptionStatus(endDate);
      setActive(status);
    }

  }

  function handleSelectChange(selectedClient: Cliente | null) {
    if(selectedClient){
        setIdSelectedClient(selectedClient.id_client)
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
                {selectedSearchMethod == "nome" ? "Digite o NOME COMPLETO do cliente" : "Digite o CPF do cliente"}
              </label>
              <select
                value={selectedSearchMethod}
                onChange={(e) => setSelectedSearchMethod(e.target.value)}
                className="text-black font-poppins rounded-lg py-1"
              >
                <option className="text-black font-poppins text-sm" value="nome">Nome</option>
                <option className="text-black font-poppins text-sm" value="cpf">Cpf</option>
              </select>
            </div>
            <div className="mt-6">
              <div className="flex gap-x-4">
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Nome completo ou CPF"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="block rounded-md font-poppins min-w-0 grow px-3 py-1.5 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
                <button
                  onClick={getClientInfo}
                  className="w-24 bg-light-green-I flex items-center justify-center rounded-md hover:bg-green-700">
                  <FiSearch className="h-6 w-6" />
                </button>
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