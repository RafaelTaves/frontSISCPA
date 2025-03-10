import { useEffect, useState } from "react";
import ClientesSelect from "../selects/ClientsSelect";
import postClient from "@/app/functions/postClient";
import GoodNotification from "../notifications/goodNotification";
import updateClient from "@/app/functions/updateClient";
import { useClients } from "@/context/ClientsContext";
import getClients from "@/app/functions/getClients";

interface Cliente {
    cpf: string;
    name: string;
    phone: string;
    id_client: number;
}

interface FormClientsProps {
    idSelectedClient: number;
    setIdSelectedClient: React.Dispatch<React.SetStateAction<number>>;
}

export default function FormClients({idSelectedClient, setIdSelectedClient}: FormClientsProps) {
    const { clientes, setClientes } = useClients();
    const [nome, setNome] = useState<string>("")
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [buttonCaption, setButtonCaption] = useState<string>("Cadastrar")
    const [showGoodNotification, setShowGoodNotification] = useState(false);

    useEffect(() => {
        if (idSelectedClient !== 0) {
            setButtonCaption("Atualizar")
        } else {
            setButtonCaption("Cadastrar")
        }
    }, [idSelectedClient])

    function handleSelectChange(selectedClient: Cliente | null) {
        if (selectedClient) {
            setNome(selectedClient.name)
            setCpf(selectedClient.cpf)
            setTelefone(selectedClient.phone)
            setIdSelectedClient(selectedClient.id_client)
        }
    }

    const handleNumericInput = (value: string) => {
        return value.replace(/\D/g, ""); // Remove tudo que não for número
    };

    function handleCloseNotification() {
        setShowGoodNotification(false)
    }

    function clearInputs() {
        setNome("")
        setCpf("")
        setTelefone("")
        setIdSelectedClient(0)
    }

    async function handleButtonClick() {
        if (idSelectedClient === 0) {
            const resp = await postClient(cpf, nome, telefone)

            if (resp.status !== "erro") {
                setShowGoodNotification(true)
                const clientsResponse = await getClients()
                setClientes(clientsResponse)
            }
        } else {
            if (idSelectedClient !== 0) {
                const resp = await updateClient(cpf, nome, telefone, idSelectedClient)

                if (resp.status !== "erro") {
                    setShowGoodNotification(true)
                    const clientsResponse = await getClients()
                    setClientes(clientsResponse)
                }
            }
        }
    }

    return (
        <>
            <div className="w-full h-auto">
                <GoodNotification
                    show={showGoodNotification}
                    title="Sucesso!"
                    desc="Alteração efetuada com sucesso"
                    onClose={handleCloseNotification}
                />
                <div className="mt-10"><span className="font-inter text-black text-xl font-semibold mx-40 2xl:mx-60">Cliente</span></div>
                <div className="flex justify-between mt-10 mx-40 2xl:mx-60">
                    {clientes !== null ?
                        <ClientesSelect clientes={clientes} onChange={handleSelectChange} />
                        : ""}
                    <div className="flex gap-x-2">
                        <button
                            onClick={handleButtonClick}
                            className="w-24 font-inter bg-light-green-I py-2 px-6 flex items-center justify-center rounded-md hover:bg-green-700">
                            {buttonCaption}
                        </button>
                        <button
                            onClick={clearInputs}
                            className="w-24 font-inter bg-dark-blue-I py-2 px-6 flex items-center justify-center rounded-md hover:bg-blue-500">
                            Limpar
                        </button>
                        <button
                            onClick={clearInputs}
                            className="w-24 font-inter bg-dark-red-I py-2 px-6 flex items-center justify-center rounded-md hover:bg-mid-red-I">
                            Excluir
                        </button>
                    </div>
                </div>
                <div className="flex justify-between mt-10 mx-40 2xl:mx-60">
                    <div className="flex flex-col">
                        <label className="text-black font-inter font-semibold">Nome Completo</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-96 mt-3 bg-white rounded-md text-gray-800 border border-gray-300 font-poppins focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-inter font-semibold">CPF</label>
                        <input
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(handleNumericInput(e.target.value))}
                            className="w-64 mt-3 bg-white rounded-md text-gray-800 border border-gray-300 font-poppins focus:outline-none"
                            maxLength={11}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-inter font-semibold">Telefone</label>
                        <input
                            type="text"
                            value={telefone}
                            onChange={(e) => setTelefone(handleNumericInput(e.target.value))}
                            className="w-64 mt-3 bg-white rounded-md text-gray-800 border border-gray-300 font-poppins focus:outline-none"
                            maxLength={11}
                        />
                    </div>
                </div>
            </div>

        </>

    )
}