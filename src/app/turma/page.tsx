"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importação do roteador do Next.js
import { Aluno } from "@/types/Aluno";
import { AlunoAtualizacao, StorageService } from "@/services/localStorageService";
import { CardDashboard } from "@/Componentes/Card-dashboard";
import { Orbitron } from "next/font/google";
import { CardMoneyQuestCoin } from "@/Componentes/CardMoneyQuestCoin";
import { CardNovidades } from "@/Componentes/CardNovidades";
import { Header } from "@/Componentes/Header";
import ListaAlunos from "@/Componentes/ListaAlunos";
import { AlunoProvider } from "@/context/AlunoContext";
import ListaTurmaAlunos from "@/Componentes/ListaTurmaAlunos";
import useTurmaAlunos from "@/hooks/useTurmaAlunos";
import { CardTopTres } from "@/Componentes/card-top3";


const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function Dashboard({ email, title, turma }: any) {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const router = useRouter();


  useEffect(() => {
    const storedAluno = StorageService.getItem<Aluno>("aluno");
    if (storedAluno) {
      setAluno(storedAluno);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const cleanup = AlunoAtualizacao(aluno, setAluno);
    return cleanup;
  }, [aluno]);

  if (!aluno) {
    return <h1>Redirecionando...</h1>;
  }

  return (
    <div className="max-w-7xl flex flex-col items-center gap-5 p-2">
      <Header />

      <CardMoneyQuestCoin MoneyCoin={aluno.bitcoin} BorderPosition="border-b-2" />

      <div className="w-full flex justify-start">
        <h3 className={`${orbitron.className} text-3xl uppercase mt-4 font-black text-white tracking-wide`}>
          Ranking da Turma
        </h3>
      </div>


      <AlunoProvider>
        <ListaTurmaAlunos email={aluno.email} turma={aluno.turma_do_wit} />
      </AlunoProvider>
    </div>
  );
}

