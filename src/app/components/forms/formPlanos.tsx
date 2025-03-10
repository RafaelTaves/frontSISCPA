import { useEffect, useState } from "react";
import ClientesSelect from "../selects/ClientsSelect";
import postClient from "@/app/functions/postClient";
import GoodNotification from "../notifications/goodNotification";
import updateClient from "@/app/functions/updateClient";
import { useClients } from "@/context/ClientsContext";
import getClients from "@/app/functions/getClients";
import getSubscriptionByClientId from "@/app/functions/getSubscriptionByClientId";
import postSubscription from "@/app/functions/postSubscription";
import updateSubscription from "@/app/functions/updateSubscription";
import calculateEndDate from "@/app/functions/calculateEndDate";

interface Cliente {
    cpf: string;
    name: string;
    phone: string;
    id_client: number;
}

interface FormPlanosProps {
    idSelectedClient: number;
    setIdSelectedClient: React.Dispatch<React.SetStateAction<number>>;
}

export default function FormPlanos({ idSelectedClient, setIdSelectedClient }: FormPlanosProps) {
    const [dataInicio, setDataInicio] = useState<string>("")
    const [dataFim, setDataFim] = useState<string>("")
    const [metodoPagamento, setMetodoPagamento] = useState<string>("");
    const [duracao, setDuracao] = useState<number>(0);
    const [buttonCaption, setButtonCaption] = useState<string>("Cadastrar")
    const [showGoodNotification, setShowGoodNotification] = useState(false);
    const [idSubscription, setIdSubscription] = useState<number>(0)

    useEffect(() => {
        if (idSelectedClient !== 0) {
            setButtonCaption("Atualizar")
            getSubscription()
        } else {
            setButtonCaption("Cadastrar")
        }
    }, [idSelectedClient])

    async function getSubscription() {
        const subscription = await getSubscriptionByClientId(idSelectedClient);

        if (subscription) {
            setDataInicio(subscription.start_date || "");
            setDuracao(subscription.duration || 0);
            setMetodoPagamento(subscription.payment_method || "");
            setDataFim(subscription.end_date || "");
            setIdSubscription(subscription.id_subscription || 0);
        } else if (subscription === "erro") {
            return
        }
    }

    function handleCloseNotification() {
        setShowGoodNotification(false)
    }

    function clearInputs() {
        setDataInicio("")
        setDataFim("")
        setDuracao(0)
        setMetodoPagamento("")
    }

    async function handleButtonClick() {
        let dataFinal = calculateEndDate(dataInicio, duracao);

        if (idSubscription === 0) {
            const resp = await postSubscription(idSelectedClient, dataInicio, dataFinal, duracao, metodoPagamento);

            if (resp !== "erro") {
                setShowGoodNotification(true)
                setDataInicio(resp.start_date)
                setDataFim(resp.end_date)
                setDuracao(resp.duration)
                setMetodoPagamento(resp.payment_method)
                setIdSubscription(resp.id_subscription)
            }
        } else if (idSubscription !== 0) {
            const resp = await updateSubscription(idSelectedClient, dataInicio, dataFinal, duracao, metodoPagamento, idSubscription);

            if (resp !== "erro") {
                setShowGoodNotification(true)
                setDataInicio(resp.start_date)
                setDataFim(resp.end_date)
                setDuracao(resp.duration)
                setMetodoPagamento(resp.payment_method)
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
                <div className="mt-20"><span className="font-inter text-black text-xl font-semibold mx-40 2xl:mx-60">Planos do Cliente</span></div>
                <div className="flex justify-between mt-6 mx-40 2xl:mx-60">
                    <span className="font-inter text-black text-md">
                        Consulte os dados do plano do cliente
                    </span>
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
                        <label className="text-black font-inter font-semibold">Data Início</label>
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            className="w-full mt-3 bg-white rounded-md text-gray-800 border border-gray-300 font-poppins focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-inter font-semibold">Duração (em meses)</label>
                        <input
                            type="number"
                            value={duracao}
                            onChange={(e) => setDuracao(Number(e.target.value))}
                            className="w-full mt-3 bg-white rounded-md text-gray-800 border border-gray-300 font-poppins focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-inter font-semibold">Metódo de Pagamento</label>
                        <input
                            type="text"
                            value={metodoPagamento}
                            onChange={(e) => setMetodoPagamento(e.target.value)}
                            className="w-full mt-3 bg-white rounded-md text-gray-800 border border-gray-300 font-poppins focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-inter font-semibold">Data Fim</label>
                        <input
                            type="date"
                            value={dataFim}
                            readOnly
                            className="w-full mt-3 bg-white rounded-md text-gray-800 border border-gray-300 font-poppins focus:outline-none"
                        />
                    </div>
                </div>
            </div>

        </>

    )
}