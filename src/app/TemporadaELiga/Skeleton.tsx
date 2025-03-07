"use client";

export default function SkeletonTemporadaELiga() {
  return (
    <div className="max-w-7xl flex flex-col w-full items-center gap-5 p-2 animate-pulse">
      
      {/* Gradiente sobre a imagem */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#141335] to-black/50 -z-10"></div>

      {/* Imagem de fundo (Placeholder) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-800 -z-20"></div>

      {/* Header Placeholder */}
      <div className="w-full h-16 bg-gray-700 rounded-md"></div>

      {/* CardMoneyQuestCoin Placeholder */}
      <div className="w-52 h-12 bg-gray-600 rounded-md"></div>

      {/* Temporadas Placeholder */}
      <div className="max-w-7xl flex flex-col w-full items-center gap-5 p-2">
        <div className="w-full h-full flex flex-col items-start justify-center px-4">
          <div className="text-white max-w-lg">
            {/* Nome da Temporada */}
            <div className="w-80 h-10 bg-gray-700 rounded-md mb-4"></div>

            {/* Descrição Placeholder */}
            <div className="w-full h-20 bg-gray-600 rounded-md mb-4"></div>

            {/* Número de Alunos Online */}
            <div className="w-56 h-6 bg-gray-500 rounded-md mb-4"></div>

            {/* Recompensas */}
            <div className="w-64 h-6 bg-gray-500 rounded-md mb-4"></div>
            <div className="w-64 h-6 bg-gray-500 rounded-md mb-4"></div>

            {/* Contagem Regressiva Placeholder */}
            <div className="w-72 h-8 bg-gray-700 rounded-md mb-6"></div>

            {/* Botão Participar */}
            <div className="w-60 h-12 bg-gray-500 rounded-md"></div>
          </div>
        </div>

        {/* Desafios Placeholder */}
        <div className="flex flex-wrap gap-8 mt-20">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="w-60 h-72 bg-gray-700 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
