import Image from "next/image";


interface CardDesafioProps {
   title: string;
   description: string;
   imageSrc: string;
   BorderPosition?: string

   mitlicador: number
   time: string | number
   spanTimeBool: string
   point: number
   onClick?: () => void; // Adicionando a prop onClick opcional
}

export function CardDesafios({ title, description, imageSrc, BorderPosition, mitlicador, spanTimeBool, point, time, onClick }: CardDesafioProps) {
   return (


      <div onClick={onClick} className={`relative w-[280px]  bg-[#0D0B21] p-4  shadow-lg border-green-500 cursor-pointer ${BorderPosition}`}>
         <span className="absolute -top-0 left-0 m-2  bg-orange-600 px-4 py-0.5 rounded-sm  text-center text-sm font-medium text-white z-20">{mitlicador || '0.7'} x</span>
         {/* Imagem no topo */}
         <div className="w-full h-24 relative overflow-hidden ">
            <Image
               src={imageSrc}
               alt={title}
               layout="fill"
               objectFit="cover"
               className="clip-path-CardNovidades-img"
            />
         </div>

         {/* Conteúdo do card */}
         <div className="mt-3 text-white">
            <h2 className="text-lg font-bold">{title}</h2>

            <p className="text-sm italic text-gray-400 mt-2">{description}</p>

            <div className="flex justify-between items-end mt-4">
               <p className="mt-2 text-orange-400 font-semibold ">🏆{point} pontos</p>

               <div>

                  <span className="text-xs text-gray-300 font-extrabold ">{spanTimeBool || "Duração"}</span>
                  <p className="text-sm text-gray-400">{time || "10"} min</p>

               </div>

            </div> 
            <button onClick={onClick} className="w-full mt-4 bg-orange-500 py-2 rounded-sm font-bold text-white text-sm hover:bg-orange-600">
            Detalhe
         </button>
         </div>
      </div>

   );
}
