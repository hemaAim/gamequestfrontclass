/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Badge } from "@/components/ui/badge";




interface CardDesafioDaTemporadaProps {
   imageSrc: string,
   title: string,
   description: string,
   rating: number,
   votes: number,
   ponto: number,
   duracao: number,
   isHot: number,
   isCreatorsLove: string,
   onClick: any
}
export default function CardDesafioDaTemporada({
   imageSrc,
   title,
   description,
   rating,
   votes,
   ponto,
   duracao,
   isHot,

   onClick
}: CardDesafioDaTemporadaProps) {
   return (
      <div className="bg-[#0D0B21] rounded-sm p-4 w-80 text-white shadow-lg relative border-l-4 border-green-700">
         {/* Game Image */}
         <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
         </div>

         {/* Badges */}
         <div className="absolute top-2 left-2 flex gap-2">
            {isHot && (
               <Badge className="bg-red-500 text-white px-4 py-1 rounded-md text-base">{isHot} x</Badge>
            )}

         </div>

         {/* Content */}
         <div className="mt-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
         </div>

         {/* Rating */}
         <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
            <span className="font-bold">{rating}%</span>
            <span className="text-gray-400">{votes} Votes</span>
         </div>

         {/* Stats */}
         <div className="flex justify-between items-center text-gray-300 text-sm mt-3">
            <div className="flex items-center gap-1">
               🏆 <span>{ponto} pontos</span>
            </div>
            <div className="flex items-center flex-col gap-1">

               Duração:
               <span> {duracao}min</span>
            </div>
         </div>

         {/* Button */}
         <button onClick={onClick} className="w-full mt-4 bg-orange-500 py-2 rounded-sm font-bold text-white text-sm hover:bg-orange-600">
            Detalhe
         </button>
      </div>
   );
}
