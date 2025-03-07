"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importação do roteador do Next.js
import { Aluno } from "@/types/Aluno";
import { AlunoAtualizacao, StorageService } from "@/services/localStorageService";

import { Orbitron } from "next/font/google";
import { CardMoneyQuestCoin } from "@/Componentes/CardMoneyQuestCoin";

import { Header } from "@/Componentes/Header";
import { CardDesafios } from "@/Componentes/CardDesafios";
import { Desafio } from "@/types/Desafios";
import { useDesafios } from "@/hooks/useDesafios";
import { imagensCardDesafioDaTemporada } from "../TemporadaELiga/imagens";
import { SkeletonDashboard } from "../dashboard/SkeletonDashboard";


const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function Desafios() {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const router = useRouter(); // Inicializa o roteador do Next.js

  const { desafios } = useDesafios(334266439);

  const [desafioSelecionado, setDesafioSelecionado] = useState<Desafio | null>(null);

  // Redireciona para login se não houver aluno autenticado
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
    return <div><SkeletonDashboard/></div>; 
  }


  return (
    <div className="max-w-7xl flex flex-col items-center gap-5 p-2">
      <Header />
      <CardMoneyQuestCoin MoneyCoin={aluno.bitcoin} BorderPosition="border-b-2" />
      <h3 className={`${orbitron.className} text-3xl uppercase flex flex-col items-center mt-4  font-black text-white tracking-wide`}>
        paginas de Desafios da semana
      </h3>



      <div className="mx-auto p-2 max-w-5xl flex flex-wrap gap-8">
        {desafios.map((desafio) => (

          <CardDesafios
            key={desafio.id}
            mitlicador={desafio.multiplicador}
            spanTimeBool="Duração"
            time={desafio.tempo_da_atividade}
            onClick={() => setDesafioSelecionado(desafio)}
            BorderPosition="border-l-4"
            description={desafio.descricao}
            
            imageSrc={imagensCardDesafioDaTemporada [Math.floor(Math.random() * imagensCardDesafioDaTemporada .length)]} 
            title={desafio.Titulo}
            point={desafio.pontos}
          />
        ))}



      </div>
      {desafioSelecionado && (
        <div
          id="timeline-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={`fixed  inset-0 flex  justify-center bg-black bg-opacity-50 top-0 right-0 left-0 z-50  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${desafioSelecionado ? 'block' : 'hidden'}`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Conteúdo do modal */}
            <div className="relative  rounded-lg shadow-sm bg-gray-900">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-white">
                  {desafioSelecionado.Titulo}

                  <div className=" flex items-start flex-col my-4">
                    <div className="flex ">
                      <p className="mt-2 text-orange-400 font-semibold text-sm ">🏆{desafioSelecionado.pontos} pontos</p>
                      <p className=" m-2  bg-orange-600 px-2 py-0.1 rounded-sm  text-center text-sm font-medium text-white z-20">{desafioSelecionado.multiplicador} x</p>

                    </div>
                    <p className=" py-0.1 rounded-sm  text-center text-sm font-medium text-white z-20"> Total de Pontos: {(desafioSelecionado.pontos) * (desafioSelecionado.multiplicador)}</p>
                  </div>{/* Exibe o título do desafio */}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setDesafioSelecionado(null)}  // Fecha o modal ao clicar no botão de fechar
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Fechar modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <p className="text-base font-semibold italic text-gray-200 mt-2">{desafioSelecionado.descricao}</p>
                <ol className="relative border-s mt-10 border-orange-500 dark:border-gray-600 ms-3.5 mb-4 md:mb-5">

                <li className="mb-10 ms-8">
  {(() => {
    const exigencias = [
      desafioSelecionado.Exigência_1,
      desafioSelecionado.Exigência_2,
      desafioSelecionado.Exigência_3,
      desafioSelecionado.Exigência_4
    ].filter(Boolean); // Filtra valores não definidos ou falsy

    const valorPorExigencia = desafioSelecionado.multiplicador / exigencias.length;

    return exigencias.map((exigencia, index) => (
      <div key={index} className="mb-10">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3.5 ring-8 ring-orange-500 dark:ring-gray-700 dark:bg-gray-600">
          <svg className="w-2.5 h-2.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z" />
          </svg>
        </span>
        <div className=""> 
        <li className="text-base italic text-gray-300 mt-2">{exigencia}</li>
        <p className="text-sm font-bold text-orange-500 flex">
          {valorPorExigencia.toFixed(2)} {/* Exibe o valor formatado */}
          
        </p> 
       </div>
       </div>
    ));
  })()}
</li>





                </ol>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
