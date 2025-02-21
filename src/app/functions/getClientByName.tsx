import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"

export default async function getClientByName (searchInput: string) {
    const token = localStorage.getItem('token');

    try{
        const encodedSearchInput = encodeURIComponent(searchInput); // Codifica espaços e caracteres especiais

        const response = await axios.get(`${BASE_URL}/client/?name=${encodedSearchInput}`,{ 
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