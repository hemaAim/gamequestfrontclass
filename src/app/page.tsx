import Image from "next/image";

import Link from "next/link"
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function Home() {
  return (
    <div className="grid text-white grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex  justify-center  flex-col gap-8 row-start-2 items-center ">
      <Image
          className="-z-10 opacity-60"
          src="/BG.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}


          priority
        /> 
        
        <ol className="list-inside list-decimal text-sm text-center font-[family-name:var(--font-geist-mono)]">
          <h1 className={`${orbitron.className}  text-6xl text-neon-green mb-2 font-extrabold italic`}>
          GAME QUEST {" "}
          </h1>
          <p className={`${orbitron.className}  text-xl text-neon-green mb-2 text-outline`}>
          O tempo corre, a aventura começa! {" "}
          
            .
          </p>

        </ol>

        
          
          <Link href="/login" className=" border-b-2 border-r-2 border-white transition-colors flex items-center justify-center gap-2 bg-orange-600 text-sm text-white sm:text-base h-10 sm:h-12 px-4 sm:px-5  flex-col sm:flex-row clip-path-BTN-Inicio ">
          
           INICIAR

          </Link>

        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/cadastro"
          target="_blank"
          rel="noopener noreferrer"
        >
         
           <code className="bg-red-500 rounded-xl  flex  gap-4 px-4 py-0.5 "> 
           <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          /> 
           Não tenho Cadastro →
            </code>
        
        </a>
      </footer>
    </div>
  );
}
