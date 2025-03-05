"use client"

import { useState, useEffect} from "react";
import { Orbitron } from "next/font/google";
import { Aluno } from "@/types/Aluno";  // Importando o tipo Aluno
import { fetchAlunosFromAPI, transferirBitcoin } from "../services/AlunoService";  // Importando o serviço de alunos
import DetalhesAlunoModal from "./ModalTranferenciaParaAluno";
import { useAluno } from "@/context/AlunoContext";



const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });
interface ListaAlunoProps {
   email?: string

}

export default function ListaAlunos({ email }: ListaAlunoProps) {

   const [alunos, setAlunos] = useState<Aluno[]>([]);

   const [loading, setLoading] = useState(true);
   const [erro, setErro] = useState<string>("");
   const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
   const [valorTransferencia, setValorTransferencia] = useState<number | "">("");
   const [, setErroTransferencia] = useState<string>("");
   const [termoPesquisa, setTermoPesquisa] = useState("");
   const { aluno} = useAluno();
   useEffect(() => {
      const fetchData = async () => {
         try {
            const alunos = await fetchAlunosFromAPI();

            // Filtra a lista removendo o aluno logado
            const alunosFiltrados = alunos.filter((aluno) => {
               const emailAluno = aluno.fields?.find((field) => field.name === "Email")?.value ?? "";
               return emailAluno.toLowerCase() !== email?.toLowerCase();
            });

            //console.log("Alunos filtrados ", alunosFiltrados)
            setAlunos(alunosFiltrados)
         } catch (error) {
            console.log(error)
            setErro("Erro ao carregar alunos. Tente novamente.");
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [email]); // Reexecuta se o email mudar



   const alunosFiltrados = alunos.filter((aluno) => {
      const nomeAluno = aluno.fields?.find((field) => field.name === "Nome do Aluno")?.value ?? "";
      return nomeAluno.toLowerCase().includes(termoPesquisa.toLowerCase());
   });


   const handleTransferencia = async () => {
      console.log("Iniciando transferência...");
      if (!alunoSelecionado) return;
      const bitcoinDisponivel = Number(String(aluno?.bitcoin).replace(/\./g, "").replace(",", "."));

      console.log("biticon do aluno dentro do handletrafnferencia:", bitcoinDisponivel, "aluno", aluno?.bitcoin)
      if (valorTransferencia === "" || valorTransferencia <= 0) {
         setErroTransferencia("Digite um valor válido.");
         return;
      }

      setErroTransferencia("");

      const valorAtualizadoParaNumero = Number(String(aluno?.bitcoin).replace(/\./g, "").replace(",", "."));

      console.log("bitcoin remetente atualizado", valorAtualizadoParaNumero);

      const sucesso = await transferirBitcoin(
         valorAtualizadoParaNumero,
         aluno?.id || "",
         alunoSelecionado.id,
         Number(valorTransferencia) || 0
      );

      if (sucesso) {
         alert("Transferência realizada com sucesso!");
         setAlunoSelecionado(null);
         setValorTransferencia("");
      } else {
         setErroTransferencia("Erro ao realizar transferência. Tente novamente.");
      }
   };

   return (
      <div className={`${orbitron.className} w-4/6 lg:w-full relative overflow-x-auto shadow-md sm:rounded-lg`}>
         <h1 className="text-3xl font-bold text-center text-white mb-6">Lista de Alunos</h1>

         {erro && <p className="text-red-500 text-sm">{erro}</p>}

         <input
            type="text"
            placeholder="Pesquisar aluno..."
            className="w-full px-4 py-2 mb-4 text-gray-700 border rounded-md focus:outline-none bg-transparent focus:ring-2 focus:ring-blue-400"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
         />

         {loading ? (
            <p>Carregando alunos...</p>
         ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-200 uppercase dark:text-gray-400">
                  <tr>
                     <th className="px-6 py-3">ID</th>
                     <th className="px-6 py-3">Nome</th>
                     <th className="px-6 py-3">Turma</th>
                     <th className="px-6 py-3">XP</th>
                     <th className="px-6 py-3">Pontos Atuais</th>
                     <th className="px-6 py-3">BTC</th>
                  </tr>
               </thead>
               <tbody>
                  {alunosFiltrados.map((aluno) => {

                     const getField = (fieldName: string) =>
                        aluno.fields?.find((field) => field.name === fieldName)?.value || "-";
                     return (
                        <tr
                           key={aluno.id}
                           className="bg-gray-900/20 border-b border-gray-200 text-white text-xs hover:bg-gray-50/10 dark:hover:bg-gray-600 cursor-pointer"
                           onClick={() => setAlunoSelecionado(aluno)}
                        >
                           <td className="px-6 py-4">{aluno.id}</td>
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
         {alunoSelecionado &&


            (
               <>
                  <DetalhesAlunoModal
                     alunoSelecionado={alunoSelecionado}
                     setAlunoSelecionado={setAlunoSelecionado}
                     valorTransferencia={valorTransferencia}
                     setValorTransferencia={setValorTransferencia}

                     handleTransferencia={handleTransferencia}

                  />
               </>
            )}
      </div>
   );
}




