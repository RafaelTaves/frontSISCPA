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
          {!isOpen ? <Bars3Icon className="h-5 w-5 text-white " /> : null}
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
            <Link href="/consultas" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/consultas") ? "bg-light-blue-I" : ""
                }`}
              >
                <HomeIcon className="h-6 w-6 text-white" />
                <span className="block font-Jost text-lg">Consultas</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/clientes" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/clientes") ? "bg-light-blue-I" : ""
                }`}
              >
                <FiUser className="h-6 w-6 text-white" />
                <span className="block font-Jost text-lg">Clientes</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/planos" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/planos") ? "bg-light-blue-I" : ""
                }`}
              >
                <WalletIcon className="h-6 w-6 text-white" />
                <span className="block font-Jost text-lg">Planos</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/barbeiros" passHref>
              <div
                className={`flex gap-x-2 p-1 border-transparent rounded-md hover:bg-light-blue-I ${
                  isActiveLink("/barbeiros") ? "bg-light-blue-I" : ""
                }`}
              >
                <BanknotesIcon className="h-6 w-6 text-white" />
                <span className="block font-Jost text-lg">
                  Barbeiros
                </span>
              </div>
            </Link>
          </li>
        </ul>
        <div className="mb-4 ps-4">
          <Link href="/" onClick={handleLogout}>
            <div className="flex gap-x-2 border-transparent rounded-md py-3 hover:bg-light-blue-I">
              <CiLogout className="h-6 w-6 text-white" />
              <h2 className=" text-lg font-bold font-poppins">Sair</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
