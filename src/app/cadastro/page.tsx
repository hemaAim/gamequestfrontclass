"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAluno } from "@/context/AlunoContext";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });
export default function Cadastro() {


   const router = useRouter();
   const { aluno } = useAluno(); // Acesso ao contexto

   const [formData, setFormData] = useState({
      nome: "",
      email: "",
      password: "",
      turma: "", // 👈 Adicionado o estado para a turma
   });

   useEffect(() => {
      if (aluno) {
         router.push("/dashboard"); // Redireciona se já estiver logado
      }
   }, [aluno, router]);

 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const PIPEFY_API_URL = process.env.NEXT_PUBLIC_PIPEFY_API_URL!;
      const PIPEFY_TOKEN = process.env.NEXT_PUBLIC_PIPEFY_TOKEN
      const PIPE_ID = parseInt(process.env.NEXT_PUBLIC_PIPE_ID_ALUNOS!); // Converte para número

console.log("piepfy url:", PIPEFY_API_URL, "PIPEFE tOKEN:", PIPEFY_TOKEN, "PIEPFY ID:", PIPE_ID)
      const mutation = {
         query: `
            mutation {
               createCard(input: {
                  pipe_id: ${PIPE_ID},
                  title: "${formData.nome}",
                  fields_attributes: [
                     {field_id: "nome_do_aluno", field_value: "${formData.nome}"},
                     {field_id: "s_rie_do_aluno", field_value: "1"},
                     {field_id: "email", field_value: "${formData.email}"},
                     {field_id: "senha_do_aluno", field_value: "${formData.password}"},
                     {field_id: "curso_do_wit", field_value: "Metaverso"},
                     {field_id: "turma_do_wit", field_value: "${formData.turma}"},
                     {field_id: "pontos_atuais", field_value: "21"},
                     {field_id: "xp", field_value: "10"},
                     {field_id: "advert_ncias", field_value: "none"},
                      {field_id: "bitcoin", field_value: "10,70"},
                       {field_id: "nivel_do_aluno", field_value: "Iniciante"},
                  ]
               }) {
                  card {
                     id
                     title
                  }
               }
            }
         `,
      };

      try {
         const response = await axios.post(PIPEFY_API_URL, mutation, {
            headers: {
               "Authorization": `Bearer ${PIPEFY_TOKEN}`,
               "Content-Type": "application/json",
            },
         });

         console.log("Resposta do Pipefy:", response.data);
         alert("Cadastro enviado com sucesso!");

         router.push("/dashboard"); // Redireciona se já estiver logado

      } catch (error) {
         console.error("Erro ao enviar:", error);
         alert("Erro ao cadastrar!");
      }
   };
   return (
      <div className="w-full h-screen bg-white">



         <form className="flex min-h-screen" onSubmit={handleSubmit}>

            {/* Left Side - Login Form */}
            <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center p-8">
               <h2 className="text-2xl font-semibold mb-6">Bem Vindo</h2>

               <input
                  type="nome"
                  id="nome"
                  name="nome"
                  placeholder="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full p-2 mb-8 bg-gray-800 rounded border border-gray-700 text-white " required />


               <input
                  type="email"
                  id="email"
                  placeholder="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 mb-8 bg-gray-800 rounded border border-gray-700 text-white" />


               <select

                  id="turma"
                  name="turma"
                  value={formData.turma}
                  onChange={handleChange}
                  className="w-full p-2 mb-8 bg-gray-800 rounded border border-gray-700 text-white"
               >
                  <option value="">Selecione a turma</option>
                  <option value="MVM2110">MVM2110</option>
                  <option value="MVM2210">MVM2210</option>
                  <option value="MVM3113">MVM3113</option>
                  <option value="MVM3213">MVM3213</option>
                  <option value="MVM4111">MVM4111</option>
                  <option value="MVM4211">MVM4211</option>
                  <option value="MVM5115">MVM5115</option>
                  <option value="MVM5215">MVM5215</option>
                  <option value="MVM6114">MVM6114</option>
                  <option value="MVM6214">MVM6214</option>





               </select>

               <input
                  type="password"
                  id="senha"
                  name="password"
                  placeholder="senha"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 bg-gray-800 rounded border border-gray-700 text-white"
                  required
               />
               <div className="flex items-center justify-between w-full mb-4">


               </div>
               <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Criar Conta
               </button>
               <p className="mt-4 text-center text-sm text-gray-500">
                  Já tem uma conta? <a href="/login" className="text-blue-600 hover:underline">Faça login</a>
               </p>
            </div>

            {/* Right Side - Information */}
            <div className="w-1/2 bg-orange-600 text-white flex flex-col justify-center items-center p-8">
               <h2 className={`${orbitron.className} text-3xl font-bold mb-4`}>GAME QUEST</h2>
               <h3 className="text-2xl font-semibold mb-4">Suba de nível e desbloqueie novas conquistas!</h3>
               <p className="text-center text-lg max-w-md mb-6">
                  Junte-se a uma comunidade dinâmica onde cada desafio concluído lhe rende pontos, medalhas e recompensas. Compita com amigos, suba no ranking e torne-se um mestre na sua área!

               </p>


            </div>
         </form>
      </div>
   );
}
