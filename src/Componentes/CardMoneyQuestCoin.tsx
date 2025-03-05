import Image from "next/image";
import { FaBitcoin } from "react-icons/fa";
interface CardMoneyQuestCoinProps{  

   MoneyCoin: number,
   BorderPosition?: string

}
export function CardMoneyQuestCoin({MoneyCoin, BorderPosition }: CardMoneyQuestCoinProps) {
   return (
      <div className={` flex items-center px-9 h-10 gap-4 bg-[#0D0B21] clip-path-CardMoneyQuestCoin border-orange-500 ${BorderPosition}`}>
         {/* Número grande */}
        
           <FaBitcoin size={25} color="gold" />
         <div className="flex items-center">
            <h1 className="text-2xl font-black text-white tracking-wide font-orbitron">
               {MoneyCoin}
            </h1>

            {/* Texto pequeno */}
            <span className="ml-2 text-lg text-gray-400 font-orbitron">
               Crypto
            </span>
         </div>

      </div>
   );
}
