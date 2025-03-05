import { Orbitron } from "next/font/google";
import Image from "next/image";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

interface CardDashboardProps {
   TextNumber?: string | number;
   TextDescription?: string;
   imageSrc: string;
   BorderPosition?: string
}

export function CardDashboard({ TextDescription, TextNumber, imageSrc, BorderPosition }: CardDashboardProps) {
   return (
      <div className="relative flex items-center justify-center ">
         {/* Imagem de fundo com opacidade */}
         <div className={`relative w-[320px] h-[140px] rounded-sm overflow-hidden  clip-path-CardDashboard bg-[#0B0A20]  border-orange-600 ${BorderPosition}`}>

         </div>

         {/* Texto sobreposto */}
         <div className="absolute flex flex-col items-center justify-center ">
            <h1 className={`${orbitron.className} text-5xl flex flex-col  items-center font-black text-white tracking-wide`}>
               {TextNumber}
               <p className="text-lg font-bold text-orange-400">
                  {TextDescription}
               </p>
            </h1>

         </div>

         {/* Recorte SVG (se necessário) */}
         <Image
            src={imageSrc}
            alt="Decorative Clip"
            className="absolute bottom-[-20px] right-[-80px] z-10"
            width={150}
            height={140}
         />
      </div>
   );
}
