import { useState } from "react";

interface Cliente {
  cpf: string;
  name: string;
  phone: string;
  id_client: number;
}

interface ClientsSelectProps {
  clientes: Cliente[];
  onChange: (selectedClient: Cliente | null) => void;
}

export default function ClientesSelect({ clientes, onChange }: ClientsSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filteredClients = clientes.filter((cliente) =>
    cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full md:w-1/2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownVisible(true);
        }}
        placeholder="Procure um cliente pelo nome..."
        className="w-full text-black block rounded-md font-poppins min-w-0 grow text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6 p-2 border border-gray-300"
      />
      {isDropdownVisible && searchTerm && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow-lg z-10">
          {filteredClients.length > 0 ? (
            filteredClients.map((cliente) => (
              <li
                key={cliente.id_client}
                onClick={() => {
                  setSearchTerm(cliente.name);
                  setIsDropdownVisible(false);
                  onChange(cliente);
                }}
                className="p-2 cursor-pointer hover:bg-gray-100 text-gray-600 font-poppins"
              >
                {cliente.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-black">Nenhum cliente encontrado</li>
          )}
        </ul>
      )}
    </div>
  );
}
