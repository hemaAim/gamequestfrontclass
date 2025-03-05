import { Orbitron } from "next/font/google";
import React from "react";

type DiscountCouponProps = {
   title: string;
   descricao: string;
   price: string;
   tempodeentrega: string;
   vencimento: string

};
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export function DiscountCoupon({ descricao, tempodeentrega, title, vencimento }: DiscountCouponProps) {
   return (
      <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-5 w-5/6 relative ">
         <div className="flex-1">
            <p className={`${orbitron.className} text-lg font-bold text-orange-500`}>{title}</p>
            <p className="text-gray-600 text-sm">{descricao}</p>
            <p className="text-xs text-gray-500 mb-3">Tempo: {tempodeentrega}</p>
         </div>

         <div className="border-l-2 border-dashed pl-4 flex flex-col items-center ">



            <p className="text-sm  text-gray-700">Vencimento:</p>
            <p className="text-xs text-white  bg-red-500 rounded-md px-2 py-1"> {vencimento}</p>
         </div>

         <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 bg-[#141335] rounded-full  "></div>
      </div>
   );
};
