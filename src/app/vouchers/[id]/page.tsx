import RemoverVoucher from "@/Componentes/RemoverVoucher";

type VoucherPageProps = {
  params: { id: string };
};

export default async function VoucherPage({ params }: VoucherPageProps) {
  // Aguarde o params ser resolvido (caso seja uma Promise)
  const resolvedParams = await params; 

  if (!resolvedParams?.id) return <div>Erro: Parâmetro ID não encontrado.</div>;

  // Decodifica o ID recebido
  const decodedId = decodeURIComponent(resolvedParams.id);
  const [aluno, title, alunoId] = decodedId.split("-"); // Separa os dados

  if (!aluno || !title || !alunoId) {
    return <div>Erro: Parâmetros inválidos.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center mb-10">
        <h1 className="text-xl font-bold text-orange-500">{title}</h1>
        <p className="text-gray-700">Este voucher pertence a:</p>
        <p className="text-lg font-semibold text-gray-900">{aluno}</p>
      </div>

      {/* Agora o botão está em um Client Component */}
      <RemoverVoucher alunoId={Number(alunoId)} title={title} />
    </div>
  );
}
