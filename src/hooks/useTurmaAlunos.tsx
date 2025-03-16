"use client";

import { useState, useEffect } from "react";

import { Aluno } from "@/types/Aluno";


interface ListaAlunoProps {
  email?: string;
  turma?: string;
  title?: string;
}

export default function useTurmaAlunos({ email, turma }: ListaAlunoProps = {}) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string>("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
       

        const alunosFiltrados = alunos.filter((aluno) => {
          const turmaAluno = aluno.fields?.find((field) => field.name === "Turma do WIT")?.value ?? "";
          return turmaAluno.toLowerCase() === turma?.toLowerCase();
        });

        console.log("turma id:", alunosFiltrados);
        const alunosOrdenados = alunosFiltrados.sort((a, b) => {
          const pontosA = Number(a.fields?.find((field) => field.name === "Pontos Atuais")?.value) || 0;
          const pontosB = Number(b.fields?.find((field) => field.name === "Pontos Atuais")?.value) || 0;
          return pontosB - pontosA;
        });
        console.log("ordem do alunos: ", alunosOrdenados);
        setAlunos(alunosOrdenados);
      } catch (error) {
        console.log(error);
        setErro("Erro ao carregar alunos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email, turma]);


  
  const top3Alunos = alunos.slice(0, 3);

console.log("Top 3 alunos:", top3Alunos);

  const alunosFiltrados = alunos.filter((aluno) => {
    const nomeAluno = aluno.fields?.find((field) => field.name === "Nome do Aluno")?.value ?? "";
    return nomeAluno.toLowerCase().includes(termoPesquisa.toLowerCase());
  });

  return {
    loading,
    alunosFiltrados,
    email,
    alunos,
    setAlunos,
    setErro,
    setLoading,
    setTermoPesquisa,
    erro, 
    termoPesquisa,
    top3Alunos
  };
}
