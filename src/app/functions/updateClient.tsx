import axios from "axios";

interface Cliente {
    cpf: string;
    name: string;
    phone: string;
    id_client: number;
}


const BASE_URL = "http://127.0.0.1:8000"

export default async function updateClient (cpf: string, name: string, phone: string, id_client: number) {
    const token = localStorage.getItem('token');

    const formBody = {
        cpf: cpf,
        name: name,
        phone: phone
    }

    try{
        const response = await axios.patch(`${BASE_URL}/client/${id_client}`, formBody, { 
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