import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"

export default async function getClients () {
    const token = localStorage.getItem('token');

    try{
        const response = await axios.get(`${BASE_URL}/clients`,{ 
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