import { useEffect, useState } from "react";
import ClientesSelect from "../selects/ClientsSelect";
import getClients from "@/app/functions/getClients";
import postClient from "@/app/functions/postClient";
import GoodNotification from "../notifications/goodNotification";
import updateClient from "@/app/functions/updateClient";

interface Cliente {
    cpf: string;
    name: string;
    phone: string;
    id_client: number;
}

export default function FormClients() {
    const [clientes, setClientes] = useState<Cliente[]>()
    const [loading, setLoading] = useState(true);
    const [idSelectedClient, setIdSelectedClient] = useState<number>(0)
    const [showBadNotification, setShowBadNotification] = useState(false);
    const [nome, setNome] = useState<string>("")
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [buttonCaption, setButtonCaption] = useState<string>("Cadastrar")
    const [showGoodNotification, setShowGoodNotification] = useState(false);

    useEffect(() => {
        setClients()
    }, [])

    useEffect(() => {
        if(idSelectedClient !== 0) {
            setButtonCaption("Atualizar")
        } else {
            setButtonCaption("Cadastrar")
        }
    }, [idSelectedClient])

    async function setClients() {
        setLoading(true);
        try {
            const resp = await getClients();

            if (resp === "erro") {
                setShowBadNotification(true)
                return;
            }

            setClientes(resp)
        } catch {
            setShowBadNotification(true)
        } finally {
            setLoading(false);
        }
    }


    function handleSelectChange(selectedClient: Cliente | null) {
        if(selectedClient){
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

    function clearInputs () {
        setNome("")
        setCpf("")
        setTelefone("")
        setIdSelectedClient(0)
    }

    async function handleButtonClick () {
        if(idSelectedClient === 0) {
            const resp = await postClient(cpf, nome, telefone)

            if(resp.status !== "erro"){
                setShowGoodNotification(true)
                setNome("")
                setCpf("")
                setTelefone("")
                setClients()
            }
        } else {
            if(idSelectedClient !== 0){
                const resp = await updateClient(cpf, nome, telefone, idSelectedClient)

                if(resp.status !== "erro"){
                    setShowGoodNotification(true)
                    setClients()
                }
            }
        }
    }

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin inline-block w-8 h-8 border-4 border-t-mid-green-I border-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="w-full h-auto">
                    <GoodNotification 
                    show={showGoodNotification}
                    title="Sucesso!"
                    desc="Alteração efetuada com sucesso"
                    onClose={handleCloseNotification}
                    />
                    <div className="flex justify-between mt-10 mx-60">
                        {clientes !== undefined ?
                            <ClientesSelect clientes={clientes} onChange={handleSelectChange} />
                            : ""}
                        <div className="flex gap-x-2">
                        <button
                            onClick={clearInputs}
                            className="w-24 font-inter bg-dark-blue-I py-2 px-6 flex items-center justify-center rounded-md hover:bg-blue-500">
                                Limpar
                        </button>
                        <button
                            onClick={handleButtonClick}
                            className="w-24 font-inter bg-light-green-I py-2 px-6 flex items-center justify-center rounded-md hover:bg-green-700">
                                {buttonCaption}
                        </button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-10 mx-60">
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
            )}
        </>

    )
}