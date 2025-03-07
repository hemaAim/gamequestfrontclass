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
               className={`fixed inset-0 flex justify-center bg-black bg-opacity-50 top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${desafioSelecionado ? 'block' : 'hidden'}`}
            >
               <div className="relative p-4 w-full max-w-md max-h-full">
                  {/* Conteúdo do modal */}
                  <div className="relative bg-white rounded-lg shadow-lg">
                     <div className="p-4">
                        <h3 className="text-xl font-bold">Detalhes do Desafio: {desafioSelecionado.Titulo}</h3>
                        <p>{desafioSelecionado.descricao}</p>
                        <Button onClick={() => setDesafioSelecionado(null)} className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
                           Fechar
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
