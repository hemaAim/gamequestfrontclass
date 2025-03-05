/* eslint-disable @typescript-eslint/no-explicit-any */
import { Desafio } from "@/types/Desafios";

const PIPEFY_API_URL = process.env.NEXT_PUBLIC_PIPEFY_API_URL!;
const PIPEFY_TOKEN = process.env.NEXT_PUBLIC_PIPEFY_TOKEN

export class DesafioService {

   private static readonly PIPEFY_API_URL =PIPEFY_API_URL;
   private static readonly PIPEFY_TOKEN = PIPEFY_TOKEN;
   
   static async buscarDesafios(numberId: number): Promise<Desafio[]> {
      const query = `
        



         {
  phase(id: ${numberId}) {
    id
    name
    
    cards {
      edges {
        node {
          id
          fields {
            name
            value
          }
        }
      }
    }
  }
}
      `;

      try {
         const response = await fetch(this.PIPEFY_API_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${this.PIPEFY_TOKEN}`,
            },
            body: JSON.stringify({ query }),
         });

         if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

         const data = await response.json();

         return data.data.phase.cards.edges.map((edge: any) => {
            const fields = edge.node.fields.reduce((acc: any, field: any) => {
               acc[field.name.trim()] = field.value;
               return acc;
            }, {});

            return {
               id: edge.node.id,
               Titulo: fields["Titulo"] || "Sem Título",
               descricao: fields["Descrição"] || "Sem descrição",
               pontos: Number(fields["pontuação"] || 0),
               multiplicador: Number(fields["multiplicador"] || 0),
               Exigência_1: fields["Exigência_1"],
               Exigência_2: fields["Exigência_2"],
               Exigência_3: fields["Exigência_3"],
               Exigência_4: fields["Exigência_4"],
               tempo_da_atividade: Number(fields["tempo_da_atividade"] || 0),
            };
         });
      } catch (error) {
         console.error("Erro ao buscar desafios:", error);
         throw new Error("Erro ao carregar desafios.");
      }
   }
}
