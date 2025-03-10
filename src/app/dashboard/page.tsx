"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Aluno } from "@/types/Aluno";
import { AlunoAtualizacao, StorageService } from "@/services/localStorageService";
import { CardDashboard } from "@/Componentes/Card-dashboard";
import { Orbitron } from "next/font/google";
import { CardMoneyQuestCoin } from "@/Componentes/CardMoneyQuestCoin";
import { CardNovidades } from "@/Componentes/CardNovidades";
import { Header } from "@/Componentes/Header";
import ListaAlunos from "@/Componentes/ListaAlunos";
import { useAluno } from "@/context/AlunoContext";
import { SkeletonDashboard } from "./SkeletonDashboard";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function Dashboard() {
  const { aluno, carregarAluno } = useAluno();
  const router = useRouter();

  useEffect(() => {
    const storedAluno = StorageService.getItem<Aluno>("aluno");

    if (storedAluno) {
      carregarAluno(storedAluno.email); // Agora usa a função do contexto para atualizar o estado
    } else {
      router.push("/login");
    }
  }, [router, carregarAluno]);

  useEffect(() => {
    const cleanup = AlunoAtualizacao(aluno, carregarAluno);
    return cleanup;
  }, [aluno, carregarAluno]);

  if (!aluno) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="max-w-7xl flex flex-col items-center gap-5 p-2">
      <Header />
      <CardMoneyQuestCoin MoneyCoin={aluno.bitcoin} BorderPosition="border-b-2" />
      
      <div className="w-full flex justify-start">
        <h3 className={`${orbitron.className} text-3xl uppercase mt-4 font-black text-white tracking-wide`}>
          Bem-vindo, {aluno.nome_do_aluno}!
        </h3>
      </div>

      <div className="flex mt-20 w-full justify-between gap-20 items-center">
        <CardDashboard imageSrc="/ClipPath.svg" TextDescription="xp's" TextNumber={aluno.xp} BorderPosition="border-b-4" />
        <CardDashboard imageSrc="/ClipPath.Card2.svg" TextDescription="Pontos" TextNumber={aluno.pontos_atuais} BorderPosition="border-y-4" />
        <CardDashboard imageSrc="/ClipPath.Card3.svg" TextDescription="Turma" TextNumber={aluno.turma_do_wit} BorderPosition="border-l-4" linkPage="/turma" />
      </div>

      <div className="mt-28 mb-14 w-full">
        <h3 className={`${orbitron.className} text-2xl uppercase flex font-medium text-[#B87333] mb-5`}>NOVIDADES</h3>
        <div className="flex justify-between gap-20 items-center">
          <CardNovidades LinkPages="/desafios" BorderPosition="border-l-4" description="Encare missões semanais e mensais, conquiste pontos e desbloqueie novas oportunidades. Quanto mais desafios você completa, mais longe você chega! 🚀" imageSrc="/cyberpunk-desafioCard.jpg" title="Desafios" />
          <CardNovidades LinkPages="/marketplace" BorderPosition="border-t-4" description="Transforme seu esforço em recompensas! Troque seus pontos por prêmios exclusivos e conquiste itens incríveis dentro do jogo. O que você vai escolher primeiro? 🛍️✨" imageSrc="/cyberpunk-MarketplaceCard.jpg" title="Marketplace" />
          <CardNovidades LinkPages="/TemporadaELiga" BorderPosition="border-l-4" description="O caminho para a glória começa aqui! Participe das temporadas, suba no ranking e mostre que você é imbatível. Quanto mais você joga, mais você ganha! 🏅🎮" imageSrc="/CardDesafioFotoOculos.jpg" title="Temporada E Liga" />
        </div>
      </div>

      <ListaAlunos email={aluno.email} title="Lista dos Alunos" turma="" />
    </div>
  );
}
