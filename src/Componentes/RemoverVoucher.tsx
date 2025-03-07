"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RemoverVoucherPorAluno } from "@/services/AlunoService";
import { toast } from "sonner";

type Props = {
  alunoId: number;
  title: string;
};

export default function RemoverVoucher({ alunoId, title }: Props) {
  const router = useRouter();

  const removerVoucher = async () => {
    try {
      const resultado = await RemoverVoucherPorAluno(alunoId, title);
      console.log("Voucher removido com sucesso:", resultado);

      toast.success(`Voucher '${title}' removido com sucesso!`);
      router.replace("/vouchers");
    } catch (error) {
      console.error("Erro ao remover o voucher:", error);
      alert("Erro ao remover o voucher. Tente novamente.");
    }
  };

  return (
    <Button onClick={removerVoucher} variant="destructive">
      Remover Voucher
    </Button>
  );
}
