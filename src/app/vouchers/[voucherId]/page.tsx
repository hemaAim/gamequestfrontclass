import RemoverVoucher from "@/Componentes/RemoverVoucher";




export default async function VoucherPage({ params, }: { params: Promise<{ voucherId: string }> }) {

   const voucherId = (await params).voucherId

   const decodedId = decodeURIComponent(voucherId);

   const [aluno, title, id] = decodedId.split("-");
   if (!aluno || !title || !id) return <div>Erro</div>

   const IdNumber = Number(id)


   return (
      <>
         <h1>{voucherId}</h1>

         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 m-5 mb-16">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
               <h1 className="text-xl font-bold text-orange-500">{title}</h1>
               <p className="text-gray-700">Este voucher pertence a:</p>
               <p className="text-lg font-semibold text-gray-900">{aluno}</p>
              
            </div>

          <div className="p-3 m-3 mt-10"> <RemoverVoucher alunoId={IdNumber} title={title} /></div>
           
           
           
         </div>
      </>

   )
}