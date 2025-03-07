// src/app/vouchers/[id]/page.tsx (Server Component)
import { notFound } from "next/navigation";
import VoucherPageClient from "./voucherPageClient";

export default function VoucherPage({ params }: { params: { id: string } }) {
  // Decodifica o ID recebido
  const decodedId = decodeURIComponent(params.id);
  const [aluno, title, alunoId] = decodedId.split("-"); // Separa os dados

  // Se os dados estiverem incompletos, retorna 404
  if (!aluno || !title || !alunoId) return notFound();

  return <VoucherPageClient aluno={aluno} title={title} alunoId={alunoId} />;
}
