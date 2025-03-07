"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Aluno } from "@/types/Aluno";
import { AlunoAtualizacao, StorageService } from "@/services/localStorageService";

import { useTemporadaELiga } from "@/hooks/useTemporadaELiga";



import { Desafio } from "@/types/Desafios";
import { TemporadaELigaService } from "@/services/Temporada&LigaService";

import { toast } from "sonner";



export const useAlunoTemporada = (PhaseId: number) => {
   const [aluno, setAluno] = useState<Aluno | null>(null);

   const { temporadaELiga, erro, loading } = useTemporadaELiga(PhaseId);
   const [desafios, setDesafios] = useState<Desafio[]>([]);
   const [desafioSelecionado, setDesafioSelecionado] = useState<Desafio | null>(null);
   const [estaNaTemporada, setEstaNaTemporada] = useState(false);
   const router = useRouter();

   // Carregar aluno do storage
   useEffect(() => {
      const storedAluno = StorageService.getItem<Aluno>("aluno");
      if (storedAluno) {
         setAluno(storedAluno);
         console.log("Aluno carregado do storage:", storedAluno);
      } else {
         router.push("/login");
      }
   }, [router]);

   // Atualização do aluno
   useEffect(() => {
      if (!aluno) return;
      return AlunoAtualizacao(aluno, setAluno);
   }, [aluno]);

   // Buscar desafios quando a temporada for carregada
   useEffect(() => {
      if (temporadaELiga.length > 0) {
         TemporadaELigaService.PegarDesafiosDaTemporada(temporadaELiga[0].id)
            .then((data) => {
               setDesafios(data);
               console.log("Desafios recebidos:", data);
            })
            .catch((err) => console.error("Erro ao buscar desafios:", err));
      }
   }, [temporadaELiga]);

   // Verificar se o aluno já está na temporada
   useEffect(() => {
      const fetchData = async () => {
         if (temporadaELiga && temporadaELiga.length > 0) {
            const idtemporada = temporadaELiga[0].id;

            try {
               const jaParticipa = await TemporadaELigaService.VerificarSeAlunoJaEstaNaTemporada(aluno?.id, idtemporada);
               if (jaParticipa) {
                  setEstaNaTemporada(true);
               } else {
                  console.log("Aluno não está na temporada");
               }
            } catch (error) {
               console.error("Erro ao verificar participação:", error);
            }
         }
      };

      fetchData();
   }, [temporadaELiga, aluno]);

   // Lógica para participar da temporada
   const handleParticipar = async (alunoId: number, temporadaId: number) => {
      try {
         const jaParticipa = await TemporadaELigaService.VerificarSeAlunoJaEstaNaTemporada(alunoId, temporadaId);
         if (jaParticipa) {
            toast.warning("Você já está participando da temporada.");
            return;
         }

         await TemporadaELigaService.AdicionandoAlunoNaTemporada(alunoId, temporadaId);
         toast.success("Você foi adicionado à temporada com sucesso!");
         setEstaNaTemporada(true);
      } catch (error) {
         toast.error("Erro ao adicionar você à temporada, chame seu professor");
         console.error("Erro ao adicionar aluno à temporada:", error);
      }
   };

   return {
      aluno,
      desafios,
      desafioSelecionado,
      setDesafioSelecionado,
      estaNaTemporada,
      handleParticipar,
      temporadaELiga,
      loading,
      erro
   };
};
