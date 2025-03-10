"use client";
import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BadNotification from "./components/notifications/badNotification";
import getClients from "./functions/getClients";
import { useClients } from "@/context/ClientsContext";

const BASE_URL = "http://127.0.0.1:8000"

export default function Login() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [hideCheck, setHideCheck] = useState<boolean>(true);
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const { setClientes } = useClients();

    const router = useRouter();

    const handleCloseNotification = () => {
      setShowNotification(false);
    };

    function passwordVisibility() {
      setHidePassword((prev) => !prev);
      setHideCheck((prev) => !prev);
    }

    const handleSubmit = async (event: any) => {
      event.preventDefault();
      
      const formDetails = new URLSearchParams();
        formDetails.append('grant_type', 'password');
        formDetails.append('username', username);
        formDetails.append('password', password);
        formDetails.append('scope', '');
        formDetails.append('client_id', '');
        formDetails.append('client_secret', '');

    try {
      const response = await axios.post(`${BASE_URL}/login`, formDetails, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
        if (response.status == 200) {
          localStorage.setItem('token', response.data.access_token);
          const clientsResponse = await getClients()
          setClientes(clientsResponse)
          router.push("/consultas")
        } else {
          setError('Authentication failed!');
          setShowNotification(true);
        }
      } catch (error) {
        setError('An error occurred. Please try again later.');
        setShowNotification(true);
      }
    };

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <BadNotification
              show={showNotification}
              title="Login Falhou"
              desc="Senha ou usuário inválido"
              onClose={handleCloseNotification}
            />
            <img
              className="mx-auto h-40 w-auto"
              src="./images/logoReduzido.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Faça login em sua conta
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Usuario
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type={hidePassword ? "password" : "text"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 mt-2 rounded border-gray-300 text-mid-blue-I focus:ring-mid-blue-I"
                        type="checkbox"
                        id="login-checkbox"
                        checked={!hideCheck}
                        onChange={passwordVisibility}
                        style={{ cursor: "pointer" }}
                      />
                      <label
                        className="absolute pb-1.5 mt-4 sm:mt-4 ml-5 font-medium text-sm leading-6 text-gray-900 cursor-pointer"
                        htmlFor="login-checkbox"
                      >
                        Mostrar senha
                      </label>
                    </div>
                  </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-mid-blue-I px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-blue-I focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mid-blue-I"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  