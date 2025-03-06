"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAluno } from "@/context/AlunoContext";
import { Orbitron } from "next/font/google";
import { toast } from "sonner";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { aluno, carregarAluno } = useAluno();

  // 🔄 Verifica se o aluno já está logado e redireciona
  useEffect(() => {
    if (aluno) {
      console.log("Redirecionando para /dashboard");
      router.replace("/dashboard");
    }
  }, [aluno, router]); // Incluindo `router` como dependência

  // 🔑 Função de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Por favor, insira um email válido.");
      toast.error("Erro: espaço Email inválido");
      return;
    }

    setLoading(true);

    try {
      console.log("validando email", email);

      const alunoAutenticado = await carregarAluno(email); // Agora recebe o retorno correto

      if (alunoAutenticado) {
        console.log("✅ Login bem-sucedido! Redirecionando...");
        toast.success("Dados encontrados ✅✨");

        setTimeout(() => router.push("/dashboard"), 500);
      } else {
        throw new Error("Aluno não encontrado");
      }
    } catch (error) {
      console.log("❌ Erro ao autenticar:", error);
      toast.error("Erro: Email não cadastrado");
      setError("Aluno não encontrado.");
    }

    setLoading(false);
  };




  return (
    <div className="w-full h-screen bg-white">
      <form className="flex min-h-screen" onSubmit={handleLogin}>
        {/* Left Side - Login Form */}
        <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-semibold mb-6">Bem Vindo</h2>

          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-800 rounded border border-gray-700 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 bg-gray-800 rounded border border-gray-700 text-white"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="w-full bg-orange-600 py-2 rounded text-white font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Login"}
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Não tem uma conta?{" "}
            <a href="/cadastro" className="text-blue-400">
              Cadastre-se
            </a>
          </p>
        </div>

        {/* Right Side - Information */}
        <div className="w-1/2 bg-orange-600 text-white flex flex-col justify-center items-center p-8">
          <h2 className={`${orbitron.className} text-3xl font-bold mb-4`}>
            GAME QUEST
          </h2>
          <h3 className="text-2xl font-semibold mb-4">
            Suba de nível e desbloqueie novas conquistas!
          </h3>
          <p className="text-center text-lg max-w-md mb-6">
            Junte-se a uma comunidade dinâmica onde cada desafio concluído lhe rende pontos,
            medalhas e recompensas. Compita com amigos, suba no ranking e torne-se um mestre na sua área!
          </p>
        </div>
      </form>
    </div>
  );
}
