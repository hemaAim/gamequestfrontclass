import Image from "next/image";
import Link from "next/link";

interface CardDesafioProps {
   title: string;
   description: string;
   imageSrc: string;
   BorderPosition?: string
   LinkPages: string
}

export function CardNovidades({ title, description, imageSrc,   BorderPosition, LinkPages }: CardDesafioProps) {
   return ( 
      <Link href={LinkPages}>
      <div className={`relative w-[280px] bg-[#0D0B21] p-4 rounded-sm clip-path-CardNovidades shadow-lg border-green-500 ${BorderPosition}`}>
         {/* Imagem no topo */}
         <div className="w-full h-24 relative overflow-hidden rounded-sm">
            <Image 
               src={imageSrc} 
               alt={title} 
               layout="fill" 
               objectFit="cover" 
               className="rounded-sm  clip-path-CardNovidades-img"
            />
         </div>

         {/* Conteúdo do card */}
         <div className="mt-3 text-white">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm text-gray-300">{description}</p>
         </div>
      </div>
      </Link>
   );
}
