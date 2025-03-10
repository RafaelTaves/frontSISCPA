import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"

interface updateSubscriptionProps {
    dataInicio: string;
    duracao: number;
    metodoPagamento: string;
    dataFim: string;
    client_id: number;
    subscription_id: number;
}

export default async function updateSubscription (client_id: number, dataInicio: string, dataFim: string, duracao: number, metodoPagamento: string, subscription_id: number) {
    const token = localStorage.getItem('token');

    const formBody = {
        start_date: dataInicio,
        duration: duracao,
        payment_method: metodoPagamento,
        end_date: dataFim,
        id_client: client_id,
        id_subscription: subscription_id
    }
    try{
        const response = await axios.patch(`${BASE_URL}/update_subscription/${subscription_id}`, formBody, { 
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        if (response.status === 200) {
            return response.data
        } 
    } catch {
        return "erro"
    }
}