"use client";

import { useState, useEffect } from "react";


import { Orbitron } from "next/font/google";
import { Header } from "@/Componentes/Header";
import { AdmLoginAutenticacao } from "@/services/AdmService"; // Importe a função de autenticação
import { Adm } from "@/types/ADM"; // Importe o tipo Adm

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

const PROFESSOR_EMAIL = "Aimhema11@gmail.com"; // E-mail do professor para teste

export default function AdminDashboard() {
  const [isProfessor, setIsProfessor] = useState<Adm | null>(null);


  useEffect(() => {
    const loadProfessor = async () => {
      const professorData = await AdmLoginAutenticacao(PROFESSOR_EMAIL);

      if (professorData) {
        setIsProfessor(professorData);
      } else {
        console.log("Professor não encontrado.");
      }
    };

    loadProfessor();
  }, []);

  return (
    <div className="max-w-7xl flex flex-col items-center gap-5 p-2">
      <Header />
      <h3 className={`${orbitron.className} text-3xl uppercase mt-4 font-black text-white tracking-wide`}>
        Bem-vindo {isProfessor ? isProfessor.nome : "Professor"}
      </h3>

      <div className="flex mt-20 w-full justify-between gap-20 items-center">
        {/* Aqui você pode adicionar os cards ou outros componentes */}
      </div>

      <div className="mt-28 w-full">
        {/* Mais conteúdo da página */}
      </div>
    </div>
  );
}
