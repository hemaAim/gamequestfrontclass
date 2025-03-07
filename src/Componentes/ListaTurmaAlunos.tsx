"use client"

import { useState, useEffect } from "react";
import { Orbitron } from "next/font/google";
import { Aluno } from "@/types/Aluno";
import { fetchAlunosFromAPI } from "../services/AlunoService";
import { FaMedal, FaTrophy } from "react-icons/fa";
import useTurmaAlunos from "@/hooks/useTurmaAlunos";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

interface ListaAlunoProps {
  email?: string;
  turma?: string;
  title?: string
}

export default function ListaTurmaAlunos({ email, title, turma }: ListaAlunoProps) {
  const { alunos, alunosFiltrados, loading, termoPesquisa, setTermoPesquisa, erro } = useTurmaAlunos({ email, turma, title });
  return (

    
    <div className={`${orbitron.className} w-4/6 lg:w-full relative h-lvh  shadow-md sm:rounded-lg`}>
      <h1 className="text-3xl font-bold text-center text-white mb-6">{title}</h1>

      {erro && <p className="text-red-500 text-sm">{erro}</p>}

      <input
        type="text"
        placeholder="Pesquisar aluno..."
        className="w-full px-4 py-2 mb-4 text-gray-200 border rounded-md focus:outline-none bg-transparent focus:ring-2 focus:ring-blue-400"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />

      {loading ? (
        <p>Carregando alunos...</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-200 uppercase dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Ranking</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Turma</th>
              <th className="px-6 py-3">XP</th>
              <th className="px-6 py-3">Pontos Atuais</th>
              <th className="px-6 py-3">BTC</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((aluno, index) => {
              const getField = (fieldName: string) =>
                aluno.fields?.find((field) => field.name === fieldName)?.value || "-";

              const rankingIcons = [<FaTrophy color="gold" className="h-5 w-5" />, <FaMedal color="silver" className="h-4 w-4" />, <FaMedal color="bronze" className="h-3 w-3" />];
              const rankingIcon = rankingIcons[index] || `${index + 1}º`;

              return (
                <tr
                  key={aluno.id}
                  className={`border-b border-gray-700 text-white text-xs hover:bg-gray-50/10 dark:hover:bg-gray-600 cursor-pointer ${index < 3 ? "bg-gradient-to-r from-blue-500/30 to-orange-400/60 text-black font-bold" : "bg-gray-900/20"
                    }`}
                >
                  <td className="px-6 py-4 font-bold">{rankingIcon}</td>
                  <td className="px-6 py-4">{getField("Nome do Aluno")}</td>
                  <td className="px-6 py-4">{getField("Turma do WIT")}</td>
                  <td className="px-6 py-4">{getField("XP")}⭐</td>
                  <td className="px-6 py-4">{getField("Pontos Atuais")}🎖️</td>
                  <td className="px-6 py-4">{getField("Bitcoin")}🪙</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}