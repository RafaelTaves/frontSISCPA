import getClients from "@/app/functions/getClients";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BadNotification from "../notifications/badNotification";
import GoodNotification from "../notifications/goodNotification";

interface Cliente {
    cpf: string;
    name: string;
    phone: string;
    id_client: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TableClientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteInfo, setClienteInfo] = useState<Cliente>({
        cpf: "",
        name: "",
        phone: "",
        id_client: 0,
    });
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [idUser, setIdUser] = useState<number>(0);
    const [showGoodNotificationCreate, setShowGoodNotificationCreate] = useState(false);
    const [showGoodNotificationEdit, setShowGoodNotificationEdit] = useState(false);
    const [showGoodNotificationDelete, setShowGoodNotificationDelete] = useState(false);
    const [showBadNotification, setShowBadNotification] = useState(false);

    useEffect(() => {
        setClients()
    }, [loading])

    async function setClients() {
        setIsTableLoading(true);
        try {
            const resp = await getClients();

            if (resp === "erro") {
                setShowBadNotification(true)
                return;
            }

            setClientes(resp)
        } catch {
            setShowBadNotification(true)
        } finally {
            setIsTableLoading(false);
        }
    }

    //   const handleUserCreated = (isSuccess: boolean) => {
    //     setIsUserCreated(isSuccess);
    //     if (isSuccess) {
    //       setClients();
    //       setShowGoodNotificationCreate(true);
    //     } else {
    //       setShowBadNotification(true);
    //     }
    //   };

    //   const handleUserEdited = (isSuccess: boolean) => {
    //     setIsUserEdited(isSuccess);
    //     if (isSuccess) {
    //       setClients();
    //       setShowGoodNotificationEdit(true);
    //     } else {
    //       setShowBadNotification(true);
    //     }
    //   };

    //   const handleUserDeleted = (isSuccess: boolean) => {
    //     setIsUserDeleted(isSuccess);
    //     if (isSuccess) {
    //       setClients();
    //       setShowGoodNotificationDelete(true);
    //     } else {
    //       setShowBadNotification(true);
    //     }
    //   };

    const openModalCreateUser = () => {
        setIsModalCreateOpen(true);
    };

    const closeModalCreateUser = () => {
        setIsModalCreateOpen(false);
    };

    //   const openModalEditUser = (userId: string) => {
    //     const userSample = usuarios.find((usuario) => usuario.id === userId);

    //     if (userSample) {
    //       setUserInfo(userSample);
    //     }
    //     setIsModalEditOpen(true);
    //   };

    const closeModalEditUser = () => {
        setIsModalEditOpen(false);
    };

    const openModalDeleteUser = () => {
        setIsModalDeleteOpen(true);
    };

    const closeModalDeleteUser = () => {
        setIsModalDeleteOpen(false);
    };

    const handleCloseNotification = () => {
        setShowBadNotification(false);
        setShowGoodNotificationCreate(false);
        setShowGoodNotificationEdit(false);
        setShowGoodNotificationDelete(false);
    };

    useEffect(() => {
        const activeNotification = showGoodNotificationCreate
            ? "goodCreate"
            : showGoodNotificationEdit
                ? "goodEdit"
                : showGoodNotificationDelete
                    ? "goodDelete"
                    : showBadNotification
                        ? "bad"
                        : null;

        if (activeNotification) {
            const timer = setTimeout(() => {
                switch (activeNotification) {
                    case "goodCreate":
                        setShowGoodNotificationCreate(false);

                    case "goodEdit":
                        setShowGoodNotificationEdit(false);

                    case "goodDelete":
                        setShowGoodNotificationDelete(false);

                    case "bad":
                        setShowBadNotification(false);
                    default:
                        break;
                }
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [
        showGoodNotificationCreate,
        showBadNotification,
        showGoodNotificationEdit,
        showGoodNotificationDelete,
    ]);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <GoodNotification
                show={showGoodNotificationCreate}
                title="Cliente cadastrado!"
                desc="Novo cliente criado com sucesso."
                onClose={handleCloseNotification}
            />
            <GoodNotification
                show={showGoodNotificationEdit}
                title="Cliente editado!"
                desc="Edição feita com sucesso."
                onClose={handleCloseNotification}
            />
            <GoodNotification
                show={showGoodNotificationDelete}
                title="Cliente apagado!"
                desc="Exclusão feita com sucesso."
                onClose={handleCloseNotification}
            />
            <BadNotification
                show={showBadNotification}
                title="Algo deu errado!"
                desc="Tente novamente."
                onClose={handleCloseNotification}
            />
            {/* {isModalCreateOpen ? (
        <FormCreateUser
          onUserCreated={handleUserCreated}
          onClose={closeModalCreateUser}
        />
      ) : null}
      {isModalEditOpen ? (
        <FormEditUser
          key={userInfo.id}
          userInfo={userInfo}
          onUserEdit={handleUserEdited}
          onClose={closeModalEditUser}
        />
      ) : null}
      {isModalDeleteOpen ? (
        <FormDeleteUser
          idUser={idUser}
          onUserDeleted={handleUserDeleted}
          onClose={closeModalDeleteUser}
        />
      ) : null} */}
            <div className="sm:flex sm:items-center pt-10">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-md text-gray-700 font-poppins">
                        Gerencie facilmente seus clientes de forma prática.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="font-Jost block rounded-md bg-mid-green-I px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-light-green-I focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mid-green-I"
                        onClick={() => openModalCreateUser()}
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            {isTableLoading ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin inline-block w-8 h-8 border-4 border-t-mid-green-I border-transparent rounded-full"></div>
                                </div>
                            ) : (
                                <>
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-3 text-left text-md font-Jost text-gray-900 w-1/7"
                                                >
                                                    Id
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-3 text-left text-md font-Jost text-gray-900 sm:pl-6 w-1/2"
                                                >
                                                    Nome
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-3 text-left text-md font-Jost text-gray-900 sm:pl-6 w-1/4"
                                                >
                                                    Cpf
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-3 text-left text-md font-Jost text-gray-900 sm:pl-6 w-1/4"
                                                >
                                                    Telefone
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                >
                                                    <span className="sr-only text-md">Editar</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                >
                                                    <span className="sr-only text-md">Excluir</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {clientes.map((cliente) => (
                                                <tr key={cliente.id_client}>
                                                    <td className="whitespace-nowrap px-3 py-4 md text-gray-500 font-poppins w-1/7">
                                                        {cliente.id_client}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 md text-gray-500 overflow-hidden truncate font-poppins w-1/2">
                                                        {cliente.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 md text-gray-500 font-poppins w-1/4">
                                                        {cliente.cpf}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 md text-gray-500 font-poppins w-1/4">
                                                        {cliente.phone}
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-Jost font-semibold sm:pr-6">
                                                        <a
                                                            href="#"
                                                            className="text-mid-green-I hover:text-light-green-I"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                // openModalEditUser(cliente.id_client);
                                                                setIdUser(cliente.id_client);
                                                            }}
                                                        >
                                                            Editar
                                                            <span className="sr-only">, {cliente.id_client}</span>
                                                        </a>
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-Jost font-semibold sm:pr-6">
                                                        <a
                                                            href="#"
                                                            className="text-mid-red-I hover:text-light-red-I"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                openModalDeleteUser();
                                                                setIdUser(cliente.id_client);
                                                            }}
                                                        >
                                                            Excluir
                                                            <span className="sr-only">, {cliente.id_client}</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
