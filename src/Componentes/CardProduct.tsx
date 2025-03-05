
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Orbitron } from "next/font/google";
import Image from "next/image";


const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });


interface CardProoductProps {

  title: string,
  price: number,
  description: string
  time: string
  categoriaDoProduto: string
  IsOculosVrImg: number
 
  onClick: any
}
export default function CardProduct({ categoriaDoProduto, description, price, time, title, IsOculosVrImg , onClick}: CardProoductProps) {

console.log('ver', IsOculosVrImg)
  return (

    <div className="">

      <div className="group  border-orange-600 border-l-2 flex  min-w-[300px]   max-w-sm flex-col self-center overflow-hidden rounded-sm bg-[#0D0B21] shadow-md ">
        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-sm  clip-path-CardProduto-img" href="#">
          { 

         
            IsOculosVrImg === 1 ? (
              <div>

                <video
                  className="peer absolute top-0 right-0 h-full w-full object-cover"
                  src={"/OculosVr.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <video
                  className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
                  src="/ControleOculosvr.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            ) :
              <Image
                src="/ImgCards4.jpg"
                alt="Imagem do Produto"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 right-0 h-full w-full object-cover"
              />
          }



          <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
          <span className="absolute top-0 left-0 m-2 rounded-full bg-orange-600 px-2 text-center text-sm font-medium text-white">{categoriaDoProduto}</span>
        </a>
        <div className="mt-4 px-5 min-w-64 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-white">{title}</h5>
          </a>
          <div className="mt-1 mb-5 flex items-center justify-between">
            <p>
              <p className=" text-sm text-gray-400 mb-5">{description}</p>
              <p className={`${orbitron.className} text-sm font-bold text-gray-300 gap-2 mb-4`}><span className=" text-sm text-gray-400 mb-5" >tempo: </span> {time}</p>
              <span className={`${orbitron.className} text-2xl font-bold text-white flex items-end`}>
                {price}<code className={`${orbitron.className} text-orange-500 text-xs font-medium ml-2`} >Crypto</code></span>

            </p>
          </div>
          <button onClick={onClick} className="w-full mt-4 bg-orange-600 py-2 rounded-sm font-bold text-white text-sm hover:bg-orange-700">
            Comprar
         </button>
        </div>
      </div>
    </div>)
}

