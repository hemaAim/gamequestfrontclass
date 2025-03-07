import { useAluno } from "@/context/AlunoContext";
import { Orbitron } from "next/font/google";
import Link from "next/link"; // Importando o Link do Next.js

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export function Header() {
  const { logout } = useAluno();
  return (
    <>
      <nav className="bg-[#0B0A20] w-full top-0 start-0 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className={`${orbitron.className} self-center text-2xl font-semibold whitespace-nowrap text-white mr-5`}>
            Game Quest
          </span>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              onClick={logout}
              className="text-white bg-orange-600 ml-5 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sair da Plataforma
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/dashboard" className="block py-2 px-3 text-white rounded-sm md:bg-transparent md:p-0">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/desafios"
                  className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Desafios
                </Link>
              </li>
              <li>
                <Link
                  href="/vouchers"
                  className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Vouchers
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
