import axios from "axios";

interface postClientProps {
    cpf: string;
    name: string;
    phone: string;
}

const BASE_URL = "http://127.0.0.1:8000"

export default async function postClient (cpf: string, name: string, phone: string) {
    const token = localStorage.getItem('token');

    const formBody = {
        cpf: cpf,
        name: name,
        phone: phone
    }

    try{
        const response = await axios.post(`${BASE_URL}/register_client`, formBody, { 
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