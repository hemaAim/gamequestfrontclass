"use client";

import { CardMoneyQuestCoin } from "@/Componentes/CardMoneyQuestCoin";
import CardProduct from "@/Componentes/CardProduct";
import { Header } from "@/Componentes/Header";
import { AlunoAtualizacao, StorageService } from "@/services/localStorageService";
import { Aluno } from "@/types/Aluno";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Orbitron } from "next/font/google";
import { useMarketplace } from "@/hooks/useMarketplace";

import { AlunoComprandoNoMarketplace } from "@/services/AlunoService";
import { SkeletonDashboard } from "../dashboard/SkeletonDashboard";


const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function Marketplace() {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const router = useRouter();

  const { marketplace,  } = useMarketplace();

  
  useEffect(() => {
    const storedAluno = StorageService.getItem<Aluno>("aluno");

    if (storedAluno) {
      setAluno(storedAluno);
    } else {
      router.push("/login"); // Redireciona para login se não houver aluno autenticado
    }
  }, [router]);

  useEffect(() => {
    const cleanup = AlunoAtualizacao(aluno, setAluno);
    return cleanup;
  }, [aluno]);

  if (!aluno) {
    return <div><SkeletonDashboard/></div>; // Exibe algo enquanto redireciona
  }



  async function handleComprarProduto(idProduto: number) {
    if (!aluno) return;
  
    try {
      const resultado = await AlunoComprandoNoMarketplace(aluno.id, idProduto);
  
      //console.log("Resultado da compra:", resultado);
  
      if (resultado.some(msg => msg.includes("Saldo insuficiente 😞. Seu saldo é de") || msg.includes("você já possui este produto"))) {
        // Se a resposta indicar que o aluno já tem o produto ou não pode comprar
        toast.warning(resultado.join("\n")); 
      } else {
        // Se a resposta for positiva
        toast.success("Produto Comprado, parabéns ✅✨");
      }
    } catch (error) {
      console.error("Erro ao comprar o produto:", error);
      toast.error("Erro ao processar a compra.");
    }
  }
  
  
 // console.log("Dados do marketpalce", marketplace)
  return (
    <div className="max-w-7xl flex flex-col items-center gap-5 p-2">
      <Header />
      <CardMoneyQuestCoin MoneyCoin={aluno.bitcoin} BorderPosition="border-b-2" />



      <div className="flex w-full items-center justify-between">

      </div>
      <h3 className={`${orbitron.className} text-3xl uppercase flex flex-col items-center mt-4  font-black text-white tracking-wide`}>
     Game Store 🏆
      </h3>

      

      <div className="flex  w-full justify-between max-w-5xl gap-6 flex-wrap">


        {marketplace.map((marketplace) => (

          <CardProduct
            IsOculosVrImg={marketplace.IsOculosVrImg}
            categoriaDoProduto={marketplace.CategoriaDoPRoduto}
            description={marketplace.Descricao}
            price={marketplace.Price}
            time={marketplace.TempoDeEntrega}
            title={marketplace.Titulo}
            key={marketplace.id}
            onClick={() => handleComprarProduto(marketplace.id)} />


        ))}

      </div>

    </div>

  );
}
