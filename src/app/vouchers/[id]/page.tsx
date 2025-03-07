"use client"
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RemoverVoucherPorAluno } from "@/services/AlunoService";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
type Props = {
  params: { id: string };
};

export default function VoucherPage({ params }: Props) { 


  
  // Decodifica o ID recebido
  const decodedId = decodeURIComponent(params.id);
  const [aluno, title, alunoId] = decodedId.split("-"); // Separa os dados
  const router = useRouter();
  // Se os dados estiverem incompletos, retorna 404
  if (!aluno || !title) return notFound();
  
  const newId = Number(alunoId)
  const removerVoucher = async () => {
    try {
      const resultado = await RemoverVoucherPorAluno(newId, title);
      console.log("Voucher removido com sucesso:", resultado);
      
       toast.success(`Voucher '${title}' removido com sucesso!`); 
       router.replace("/vouchers");

    } catch (error) {
      console.error("Erro ao remover o voucher:", error);
      alert("Erro ao remover o voucher. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center mb-10">
        <h1 className="text-xl font-bold text-orange-500">{title}</h1>
        <p className="text-gray-700">Este voucher pertence a:</p>
        <p className="text-lg font-semibold text-gray-900">{aluno}</p>
      </div>
      <Button onClick={removerVoucher} variant="destructive">
        Remover Voucher
      </Button>
    </div>
  );
}
