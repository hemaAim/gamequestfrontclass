import Image from "next/image";

interface CardLevelUpProps {
   Title: string;
   ImgArray: { [key: number]: string }; // Objeto que mapeia níveis para imagens
   Level: number;
   levelProgress: number;
}

export function CardLevelUp({ Title, ImgArray, Level, levelProgress }: CardLevelUpProps) {
   return (
      <div className="max-w-full min-w-56 relative mt-20 h-30 flex flex-col items-center justify-between text-white ">
          <div className={`relative w-11/12 flex flex-col items-center rounded-sm overflow-hidden    `}>
          <div className=" flex flex-col mt-8 mb-8 items-center w-3/5">
            <h1 className="text-lg font-bold">{Title}</h1>

            <div className="min-w-full bg-gray-700 rounded-md  h-2 dark:bg-gray-700"> 
               <div
                  className="bg-orange-600 rounded-md text-xs font-medium text-blue-100 text-center p-1 leading-none "
                  style={{ width: `${levelProgress}%` }} // Passando um objeto
               >
      
               </div>

            </div>




         </div>

</div>
         {ImgArray[Level] ? (
            <Image className="absolute top-[-40px] z-40" src={ImgArray[Level]} alt={`Level ${Level}`} width={90} height={100} />
         ) : (
            <p>Imagem não encontrada</p>
         )}

        
      </div>
   );
}
