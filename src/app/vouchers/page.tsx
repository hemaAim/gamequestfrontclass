"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Orbitron } from "next/font/google";

import { CardMoneyQuestCoin } from "@/Componentes/CardMoneyQuestCoin";
import { Header } from "@/Componentes/Header";
import { DiscountCoupon } from "@/Componentes/vouchers";

import { AlunoAtualizacao, StorageService } from "@/services/localStorageService";
import { VoucherPorAluno } from "@/services/AlunoService";

import { Aluno } from "@/types/Aluno";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function Vouchers() {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedAluno = StorageService.getItem<Aluno>("aluno");

    if (storedAluno) {
      setAluno(storedAluno);
    } else {
      router.push("/login"); // Redireciona para login se não houver aluno autenticado
    }
  }, []);

  useEffect(() => {
    const cleanup = AlunoAtualizacao(aluno, setAluno);
    return cleanup;
  }, [aluno]);

  useEffect(() => {
    async function fetchVouchers() {
      if (aluno) {
        try {
          const vouchersComprados = await VoucherPorAluno(aluno.id);
          console.log("Vouchers comprados:", vouchersComprados);
          setVouchers(vouchersComprados);
        } catch (error) {
          console.error("Erro ao buscar vouchers:", error);
        }
      }
    }

    fetchVouchers();
  }, [aluno]);

  if (!aluno) {
    return <h1>Redirecionando...</h1>;
  }

  return (
    <div className="max-w-7xl flex flex-col items-center gap-5 p-2">
      <Header />
      <CardMoneyQuestCoin MoneyCoin={aluno.bitcoin} BorderPosition="border-b-2" />

      <h3 className={`${orbitron.className} text-3xl uppercase flex flex-col items-center mt-4 font-black text-white tracking-wide`}>
        Vouchers Obtidos
      </h3>

      <div className="flex   items-end justify-center max-w-5xl  gap-3 flex-wrap">
  {vouchers.length > 0 ? (
    vouchers.map((voucher, index) => (
      <DiscountCoupon
        key={index}
        title={voucher.title}
        descricao={voucher.descricao}
        price={voucher.price}
        tempodeentrega={voucher.tempodeentrega}
        vencimento={voucher.vencimento}
      />
    ))
  ) : (
    <p className="text-white">Nenhum voucher disponível.</p>
  )}
</div>

    </div>
  );
}
