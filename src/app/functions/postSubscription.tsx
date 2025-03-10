import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"

interface postSubscriptionProps {
    dataInicio: string;
    duracao: number;
    metodoPagamento: string;
    dataFim: string;
    client_id: number;
}

export default async function postSubscription (client_id: number, dataInicio: string, dataFim: string, duracao: number, metodoPagamento: string) {
    const token = localStorage.getItem('token');

    try{
        const response = await axios.get(`${BASE_URL}/subscriptions`,{ 
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