"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";
import TableClientes from "../components/tables/TableClientes";
import ClientesSelect from "../components/selects/ClientsSelect";
import FormClients from "../components/forms/formClients";

const BASE_URL = "http://127.0.0.1:8000"

export default function Clientes() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${BASE_URL}/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
        setLoading(false)
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/');
      }
    };

    verifyToken();
  }, [router]);

  if (loading) {
    return <div>{null}</div>;
  }

  return (
    <div className="min-h-screen max-h-screen w-full flex flex-col md:flex-row bg-gray-200">
      <SideBar />
      <div className="w-full flex-col overflow-y-auto">
        <Header pageName="Clientes" />
        <div className="w-full h-auto">
          <FormClients/>
        </div>
      </div>
    </div>
  )
}