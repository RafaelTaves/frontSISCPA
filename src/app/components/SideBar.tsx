"use client";
import React, { useEffect, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BanknotesIcon,
  QrCodeIcon,
  TagIcon,
  WalletIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { CiLogout, CiUser } from "react-icons/ci";
import { BiFoodMenu } from "react-icons/bi";
import Link from "next/link";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { MdOutlineFastfood } from "react-icons/md";
import { useRouter } from 'next/navigation';

const BASE_URL = "http://127.0.0.1:8000"

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = window.location.pathname;
  const isActiveLink = (href: string) => href === pathname;

  function handleLogout() {
    const confirm = window.confirm("Tem certeza que deseja fazer logout?");
    if (confirm) {
      if (typeof window !== "undefined") {
        localStorage.clear();
        router.push("/")
      }
    }
  }

  return (
    <div className="flex">
      <div className="md:hidden w-full flex justify-between px-2 pt-2 pb-1 bg-mid-blue-I">
        <button onClick={toggleMenu} className="focus:outline-none z-50">
          {!isOpen ? <Bars3Icon className="h-5 w-5 text-black " /> : null}
        </button>
        <img src={`./images/logoReduzido.png`} className="h-14" />
      </div>

      <div
        className={`fixed top-0 left-0 h-full overflow-y-auto flex flex-col bg-dark-blue-I text-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static transition-transform duration-300 ease-in-out w-44 md:w-64`}
      >
        <div className="flex p-4 pb-0 justify-between">
          <img src={`./images/logoReduzido.png`} className="h-14" />
          <div className="md:hidden flex ">
            <button onClick={toggleMenu} className="focus:outline-none z-50">
              {isOpen ? <XMarkIcon className="h-5 w-5 text-white" /> : null}
            </button>
          </div>
        </div>
        <ul className="space-y-2 p-4 flex-1">
          <li>
            <Link href="/home" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/home") ? "bg-light-blue-I" : ""
                }`}
              >
                <HomeIcon className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <p className="text-sm text-mid-gray-I font-Poppins">RESTAURANTE</p>
          </li>
          <li>
            <Link href="/informacoes" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/informacoes") ? "bg-light-blue-I" : ""
                }`}
              >
                <IoIosInformationCircleOutline className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">Informações</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/usuarios" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/usuarios") ? "bg-light-blue-I" : ""
                }`}
              >
                <FiUser className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">Usuários</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/formaspagamento" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/formaspagamento") ? "bg-light-blue-I" : ""
                }`}
              >
                <BanknotesIcon className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">
                  Formas de Pagamento
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/cardapiodigital" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/cardapiodigital") ? "bg-light-blue-I" : ""
                }`}
              >
                <QrCodeIcon className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">
                  Cardápio Digital
                </span>
              </div>
            </Link>
          </li>
          <li>
            <p className="text-sm text-mid-gray-I font-Poppins">SERVIÇOS</p>
          </li>
          <li>
            <Link href="/categorias" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/categorias") ? "bg-light-blue-I" : ""
                }`}
              >
                <BiFoodMenu className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">Grupos</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/produtos" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/produtos") ? "bg-light-blue-I" : ""
                }`}
              >
                <MdOutlineFastfood className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">Produtos</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/tags" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/tags") ? "bg-light-blue-I" : ""
                }`}
              >
                <TagIcon className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">Tags</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/opcionais" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/opcionais") ? "bg-light-blue-I" : ""
                }`}
              >
                <WalletIcon className="h-5 w-5 text-white" />
                <span className="block font-Jost text-base">Opcionais</span>
              </div>
            </Link>
          </li>
        </ul>
        <div className="mb-4 ps-4">
          <Link href="/login" onClick={handleLogout}>
            <div className="flex gap-x-2 border-transparent rounded-md py-3 hover:bg-light-blue-I">
              <CiLogout className="h-5 w-5 text-white" />
              <h2 className=" text-lg font-bold font-Poppins">Logout</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
