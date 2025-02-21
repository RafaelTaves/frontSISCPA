interface tableConsultaProps {
    name: string;
    status: boolean;
    end_date: Date;
}

export default function TableConsultas({name, status, end_date}: tableConsultaProps) {
    return (
        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-Jost text-gray-900 font-inter w-1/2">
                        Nome
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-Jost text-gray-900 font-inter w-1/4">
                        Status
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-Jost text-gray-900 font-inter w-1/4">
                        Expira em
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                    <td className="whitespace-nowrap overflow-hidden truncate px-3 py-4 text-md text-gray-500 font-poppins w-1/2">
                        {name} 
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500 font-poppins w-1/4">
                        <span className={`px-3 py-2 rounded-lg text-white ${status ? 'bg-light-green-I': 'bg-light-red-I'}`}>{status ? "ativo" : "Expirado"}</span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500 font-poppins w-1/4">
                        {end_date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                </tr>
            </tbody>
        </table>

    )
}