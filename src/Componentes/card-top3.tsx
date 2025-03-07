import React from "react";

export interface AlunoTurma {
   id?: string;
   fields: {
     name: string;
     value: string | number;
   }[];
 }

interface CardDashboardProps {
  posicao: number;
  aluno: AlunoTurma;
}

export function CardTopTres({ posicao, aluno }: CardDashboardProps) {
  const medalhas = ["🥇", "🥈", "🥉"]; // Ícones para os 3 primeiros lugares

  const nomeAluno = aluno.fields?.find((field) => field.name === "Nome do Aluno")?.value ?? "Sem Nome";
  const pontos = Number(aluno.fields?.find((field) => field.name === "Pontos Atuais")?.value) || 0;

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center gap-4">
        <span className="text-3xl">{medalhas[posicao - 1] || "🎖️"}</span>
        <h3 className="text-lg font-bold">{nomeAluno}</h3>
      </div>
      <span className="text-xl font-semibold">{pontos} pontos</span>
    </div>
  );
}
