"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfessor } from "@/context/ProfessorContext";



export default function LoginAdm() {
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();
   const { carregarProfessor, professor } = useProfessor();

   useEffect(() => {
      if (professor) {
         router.push("/dashboard"); // Redireciona automaticamente se o professor estiver logado
      }
   }, [professor, router]);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
   
      // Verifica se o email é válido
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
         setError("Por favor, insira um email válido.");
         setLoading(false);
         return;
      }
   
      try {
        // console.log("Tentando carregar professor com o email:", email); // Log para verificar a chamada
         await carregarProfessor(email); // Atualiza o contexto
         router.push("/Admin/dashboard"); // Redireciona para o dashboard após login
      } catch (error) {
         setError("Aluno não encontrado.");
         console.error("Erro ao carregar professor:", error); // Log para capturar o erro
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

               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

               <button
                  className="w-full bg-orange-600 py-2 rounded text-white font-semibold"
                  type="submit"
                  disabled={loading}
               >
                  {loading ? "Carregando..." : "Login"}
               </button>

               <p className="text-gray-500 text-sm mt-4">
                  Não tem uma conta?{" "}
                  <a href="cadastro" className="text-blue-400">
                     Cadastro
                  </a>
               </p>
            </div>
         </form>
      </div>
   );
}
