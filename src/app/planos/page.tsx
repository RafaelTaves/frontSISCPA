"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";

const BASE_URL = "http://127.0.0.1:8000"

export default function Planos () {
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

    return(
        <div className="min-h-screen max-h-screen w-full flex flex-col md:flex-row bg-gray-200">
            <SideBar/>
            <div className="w-full flex-col overflow-y-auto">
                <Header pageName="Planos"/>
                <div className="w-full h-auto">

                </div>
            </div>
        </div>
    )
}