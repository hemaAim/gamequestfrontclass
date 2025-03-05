import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Trophy, Users } from "lucide-react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });


interface TemporadaDaLigaCardProps {
  title?: string;
  description?: string;
  Data_inicio?: string;
  Data_fim?: string;
  status?: string;
  quantidadeDeDesafios?: number;
  DesafiosDaTemporada?: string[];
  AlunosParticipante?: string[];
  AlunoTop3?: string[];
  XpParaPremiacao?: number;
  QuantidadeDeCryptoFixo?: number;
  onclick: any;
  showVerDesafios?: boolean; // New prop to control button visibility
}

export default function TemporadaDaLigaCard({
  AlunoTop3,
  AlunosParticipante,
  Data_fim,
  Data_inicio,
  onclick,
  DesafiosDaTemporada,
  QuantidadeDeCryptoFixo,
  XpParaPremiacao,
  description,
  quantidadeDeDesafios,
  status,
  title,
  showVerDesafios, // Receive the prop
}: TemporadaDaLigaCardProps) {
  return (
    <div className={`relative w-full max-w-full p-5 border text-white rounded-md overflow-hidden shadow-lg`}>
      <Image
        src={'/CapaDeFundoTemporada.svg'}
        alt=""
        fill
        className="object-cover opacity-50 -z-10"
        priority
      />

      <h2 className={`${orbitron.className} text-3xl font-bold text-white uppercase tracking-wide`}>
        ⚡ {title}
      </h2>
      <CardContent className="mt-4 space-y-4 text-gray-300">
        <p>{description}</p>
        <div className="flex items-center space-x-3">
          <Trophy className="text-yellow-400" size={20} />
          <p className="text-lg">Os <span className="text-yellow-400 font-semibold">{Data_inicio}</span> {Data_fim}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Users className="text-cyan-400" size={20} />
          <p className="text-lg">Todos que completarem <span className="text-cyan-400 font-semibold">X desafios</span> ganham uma quantidade fixa de Criptons.</p>
        </div>

        {/* Conditionally render the "Ver Desafios" button */}
        {showVerDesafios && (
          <div className="mt-5">
            <button
              onClick={onclick}
              className="text-black bg-blue-400 text-xl px-5 py-2 rounded-xl font-semibold shadow-lg hover:bg-blue-500 transition"
            >
              Ver Desafios
            </button>
          </div>
        )}

        <div className="mt-5">
          <button
            onClick={onclick}
            className="text-black bg-green-400 text-xl px-5 py-2 rounded-xl font-semibold shadow-lg hover:bg-green-500 transition"
          >
            Participar Agora
          </button>
        </div>
      </CardContent>
    </div>
  );
}