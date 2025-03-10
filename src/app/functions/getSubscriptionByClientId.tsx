import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"

export default async function getSubscriptionByClientId (client_id: number) {
    const token = localStorage.getItem('token');

    try{
        const response = await axios.get(`${BASE_URL}/subscriptions/client/${client_id}`,{ 
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        if (response.status === 200) {
            return response.data[0]
        } 
    } catch {
        return "erro"
    }
}