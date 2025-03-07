import { Orbitron } from "next/font/google";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";



type DiscountCouponProps = {
   title: string;
   descricao: string;
   price: string;
   tempodeentrega: string;
   vencimento: string;
   aluno: string;
   alunoId: number
};

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export function DiscountCoupon({ descricao, tempodeentrega, title, vencimento, aluno, alunoId }: DiscountCouponProps) {
   // Criar um ID único (pode ser um hash, UUID ou outro identificador único)
   const voucherId = encodeURIComponent(`${aluno}-${title}-${alunoId}`); // Evita problemas com caracteres especiais

   // URL da página de detalhes do voucher

   const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/${voucherId}`;

   return (
      <div className="relative flex items-center bg-gradient-to-r from-cyan-600 to-green-400 max-w-full w-full h-28 rounded-lg shadow-lg overflow-hidden">
         {/* Código de barras */}
         <div className="w-24 h-full p-2 bg-white flex items-center justify-center">
            <QRCodeCanvas value={qrUrl} size={80} />
    


           
         </div>




         <div className="flex-1 px-4 py-2 text-white">
            <h1 className={`${orbitron.className} text-lg font-bold text-white `}>{title}</h1>
            <p className="text-gra-200 text-sm">{descricao}</p>
            <p className="text-xs text-gray-900 mb-3">Tempo: {tempodeentrega}</p>
         </div>



         {/* QR Code que leva para a página do voucher */}
         <div className="flex flex-col items-center pr-4">
            <div className="border-l-2 border-dashed pl-4 flex flex-col items-center">
               <p className="text-xs text-gray-700 opacity-80">VENCIMENTO:</p>
               <p className="text-xs text-white bg-red-500 rounded-md px-1 py-1">{vencimento}</p>
            </div>
         </div>

         <div className="absolute -top-1 left-[5.4rem] -translate-y-3 h-5 w-5 bg-[#141335] rounded-full"></div>
         <div className="absolute -bottom-7 left-[5.4rem] -translate-y-3 h-5 w-5 bg-[#141335] rounded-full"></div>
         <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 bg-[#141335] rounded-full"></div>
      </div>
   );
};
