/* eslint-disable @typescript-eslint/no-explicit-any */
import { Adm } from "@/types/ADM";

const PIPEFY_API_URL = process.env.NEXT_PUBLIC_PIPEFY_API_URL!;
const PIPEFY_TOKEN = process.env.NEXT_PUBLIC_PIPEFY_TOKEN;

//const PIPE_ID = parseInt(process.env.NEXT_PUBLIC_PIPE_ID_ALUNOS!);

export async function AdmLoginAutenticacao(email: string): Promise<Adm | null> {
   const queryLogin = `
   query {
      table(id: 305788346) {
        id
        members {
          user {
            id
            email
          }
        }
        table_records {
          edges {
            node {
              id
              title
            }
          }
        }
      }
   }
   `;

   try {
      console.log("Enviando requisição para o Pipefy...");

      const response = await fetch(PIPEFY_API_URL, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PIPEFY_TOKEN}`,
         },
         body: JSON.stringify({ query: queryLogin }),
      });

      if (!response.ok) {
         console.error(`Erro na requisição: ${response.status}`);
         throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      console.log("Dados recebidos do Pipefy:", data);
      console.log("Membros encontrados:", data.data.table.members.user.email);
      // Verificando se members está sendo retornado corretamente
      if (!data?.data?.table?.members?.length) {
         console.log("Nenhum membro encontrado.");
         return null;
      }

    

      // Verifica se o email fornecido corresponde a algum membro
      const memberEmail = data.data.table.members.find((member: any) => {
         return member.user?.email?.toLowerCase() === email.toLowerCase();
      });

      console.log("Resultado da busca pelo email:", memberEmail);

      if (!memberEmail) {
         console.log("Email não encontrado.");
         return null;
      }

      // Recuperando o título do professor, que é o nome do usuário
      const professorTitle = data.data.table_records.edges[0]?.node.title;

      if (!professorTitle) {
         console.log("Título do professor não encontrado.");
         return null;
      }

      // Criando o objeto Adm com base nos dados encontrados
      const userData: Adm = {
         role: 1, // Se você deseja fixar o role como "Professor"
         email: email,
         nome: professorTitle, // O nome do professor é o título no seu caso
      };

      console.log("Dados do usuário encontrados:", userData);

      return userData;
   } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
   }
}

