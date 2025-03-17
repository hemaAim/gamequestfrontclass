"use client";
import { Orbitron } from "next/font/google";
import { CardMoneyQuestCoin } from "@/Componentes/CardMoneyQuestCoin";
import { Header } from "@/Componentes/Header";
import Image from "next/image";
import Countdown from "@/Componentes/Countdown";
import { Button } from "@/components/ui/button";
import CardDesafioDaTemporada from "@/Componentes/CardDesafioDaTemporada";
import { FaBitcoin, FaGlobe } from "react-icons/fa";
import { imagensCardDesafioDaTemporada, imagensBGDDaTemporada } from "./imagens";
import { useAlunoTemporada } from "./hook";
import SkeletonTemporadaELiga from "./Skeleton";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function TemporadaELiga() {
   const { aluno, desafios, desafioSelecionado, setDesafioSelecionado, estaNaTemporada, handleParticipar, loading, erro, temporadaELiga } = useAlunoTemporada(334522537);

   if (!aluno) return null;

   return (
      <>
         <div className="max-w-7xl flex flex-col w-full items-center gap-5 p-2">

            {/* Gradiente sobre a imagem */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#141335] to-black/50 -z-10"></div>

            {/* Imagem de fundo */}
            <Image
               src={imagensBGDDaTemporada[Math.floor(Math.random() * imagensBGDDaTemporada.length)]}
               alt="Background Image"
               layout="fill"
               objectFit="cover"
               className="absolute top-0 left-0 w-full h-full -z-20"
            />

            <Header />
            <CardMoneyQuestCoin MoneyCoin={aluno.bitcoin} BorderPosition="border-b-2" />
         </div>

         {!loading && !erro && Array.isArray(temporadaELiga) && temporadaELiga.length > 0 ? (

            temporadaELiga.map((temporada) => (

               <div className="max-w-7xl flex flex-col w-full items-center gap-5 p-2" key={temporada.id}>
                  <div className="w-full h-full flex flex-col items-start justify-center px-4">
                     <div className="text-white max-w-lg">
                        <h3 className={`${orbitron.className} text-5xl  max-w-screen-sm w-screen text-white uppercase flex flex-col items-start mt-24 font-black tracking-wide`}>
                           {temporada.nome_da_temporada}
                        </h3>
                        <p className="mt-5 italic tracking-wide text-justify border-b pb-5 border-gray-600 border-dashed">{temporada.descricao}</p>
                        <p className="text-base font-medium text-white flex items-center mt-4 gap-2"> <FaGlobe className="text-blue-400 text-xl" /> {temporada.alunos_participantes.length} {temporada.alunos_participantes.length === 1 ? 'aluno' : 'alunos'} online
                        </p>

                        <h2 className="text-lg font-medium mt-4 flex items-center gap-2 ">Recompensa TOP3: <span className={`${orbitron.className} flex items-center gap-2 font-extrabold `}> {temporada.quantidade_de_criptons_para_o_top_3} <FaBitcoin size={20} color="gold" /></span></h2>

                        <h2 className="text-lg font-medium mt-4 flex items-center gap-2 ">Recompensa: <span className={`${orbitron.className} flex items-center gap-2 font-extrabold `}> {temporada.quantidade_de_criptons_fixos} <FaBitcoin size={20} color="silver" /></span></h2>

                        <Countdown Finaliza_em="Finaliza em" targetDate={temporada.termino} inicio={temporada.data_de_inicio} />
                        <Button onClick={() => handleParticipar(aluno.id, temporada.id)} className={`mt-18 ${estaNaTemporada ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed text-black" : "bg-green-600 text-white hover:bg-green-500"}   px-8 py-6 font-bold rounded-sm shadow-lg`}>
                           PARTICIPAR DA TEMPORADA
                        </Button>
                     </div>
                  </div>

                  <div className="flex flex-col w-screen h-screen overflow-x-hidden mt-20">
                     <div className="mx-auto p-2 max-w-5xl flex flex-wrap gap-8">
                        {estaNaTemporada ? (
                           desafios.length > 0 ? (
                              desafios.map((desafio) => (
                                 <CardDesafioDaTemporada
                                    key={desafio.id}
                                    imageSrc={imagensCardDesafioDaTemporada[Math.floor(Math.random() * imagensCardDesafioDaTemporada.length)]}
                                    isCreatorsLove="3"
                                    isHot={desafio.multiplicador}
                                    description={desafio.descricao}
                                    ponto={desafio.pontos}
                                    rating={3}
                                    title={desafio.Titulo}
                                    votes={3}
                                    duracao={desafio.tempo_da_atividade}
                                    onClick={() => setDesafioSelecionado(desafio)}
                                 />
                              ))
                           ) : (
                              <p className="text-white text-lg">Nenhum desafio disponível.</p>
                           )
                        ) : (
                           <p className="text-white text-lg">Você precisa participar de uma temporada para ver os desafios.</p>
                        )}
                     </div>
                  </div>
               </div>
            ))
         ) : (
            <p className="text-white text-lg"><SkeletonTemporadaELiga/></p>
         )}

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

              {desafioSelecionado.links ? (
                <div className="m-4">
                  <Link
                    target="_blank"
                    href={desafioSelecionado.links}
                    className="relative text-blue-500 font-medium transition-colors duration-300 hover:text-blue-700
                 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] 
                 before:bg-blue-500 before:transition-all before:duration-300
                 hover:before:w-full"
                  >
                    Link Da Atividade
                  </Link>
                </div>
              ) : null}
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
      </>
   );
}
