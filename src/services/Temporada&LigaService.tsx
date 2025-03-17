/* eslint-disable @typescript-eslint/no-explicit-any */
import { Desafio } from "@/types/Desafios";
import { TemporadaELiga } from "@/types/TemporadaELiga"



const PIPEFY_API_URL = process.env.NEXT_PUBLIC_PIPEFY_API_URL!;
const PIPEFY_TOKEN = process.env.NEXT_PUBLIC_PIPEFY_TOKEN




export class TemporadaELigaService {


   static async PegandoDadosTeporadaELiga(PhasenumberId: number): Promise<TemporadaELiga[]> {

      const query = `
   {
       phase(id: ${PhasenumberId}) {
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
         const response = await fetch(PIPEFY_API_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${PIPEFY_TOKEN}`,
            },
            body: JSON.stringify({ query }),
         });

         if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

         const data = await response.json();

         return data.data.phase.cards.edges
            .map((edge: any) => {
               const fields = edge.node.fields.reduce((acc: any, field: any) => {
                  acc[field.name.trim()] = field.value;
                  return acc;
               }, {});

               return {
                  id: edge.node.id,
                  nome_da_temporada: fields["Nome da Temporada"] || "Sem Título",
                  descricao: fields["Descrição"] || "Sem descrição",
                  data_de_inicio: fields["Data de Início"] || "",
                  termino: fields["Termino"] || "",
                  status: fields["Status"] || "Indefinido",
                  quantidade_de_desafios_na_temporada: Number(fields["Quantidade de Desafios na Temporada"] || 0),
                  desafios_da_temporada: fields["Desafios da Temporada"] ? fields["Desafios da Temporada"].split(",") : [],
                  alunos_participantes: fields["Alunos Participantes"] ? fields["Alunos Participantes"].split(",") : [],
                  alunos_no_top_03: fields["Alunos no Top 03"] ? fields["Alunos no Top 03"].split(",") : [],
                  xp_necessario_para_premiacao: Number(fields["XP Necessário para Premiação"] || 0),
                  quantidade_de_criptons_fixos: Number(fields["Quantidade de Criptons Fixos"] || 0),
                  quantidade_de_criptons_para_o_top_3: Number(fields["Quantidade de Criptons para o Top 3"] || 0),
                  temporada_ativada: Number(fields["Temporada ativada?"] || 0),
               };
            })
            .filter((temporada: any) => temporada.temporada_ativada === 1);
      } catch (error) {
         console.error("Erro ao buscar desafios:", error);
         throw new Error("Erro ao carregar desafios.");
      }
   }

 
   static async VerificarSeAlunoJaEstaNaTemporada(alunoId: number, temporadaId: number): Promise<boolean> {
      const query = `
      {
         card(id: ${temporadaId}) {
            fields {
               name
               connectedRepoItems {
                  ... on PublicCard {
                     id
                  }
               }
            }
         }
      }`;
  
      try {
          const response = await fetch(PIPEFY_API_URL, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${PIPEFY_TOKEN}`,
              },
              body: JSON.stringify({ query }),
          });
  
          if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
  
          const data = await response.json();
  
          // 🔍 Verifica se o card existe antes de acessar fields
          if (!data.data || !data.data.card) {
              console.warn("⚠️ Card não encontrado ou resposta da API está incorreta.");
              return false;
          }
  
          // 🔍 Filtra o campo específico "Alunos Participantes" e extrai os IDs conectados
          const connectedIds: string[] = data.data.card.fields
              ?.filter((field: any) => field.name.trim() === "Alunos Participantes")
              .flatMap((field: any) => field.connectedRepoItems || [])
              .map((item: any) => item.id) || [];
  
          console.log("IDs conectados de 'Alunos Participantes':", connectedIds);
  
          return connectedIds.includes(alunoId.toString());
      } catch (error) {
          console.error("Erro ao buscar 'Alunos Participantes':", error);
          return false;
      }
  }
  

   static async AdicionandoAlunoNaTemporada(IdRemetente: number, IdTemporada: number): Promise<string[]> {
      const query = `
      {
         card(id: ${IdTemporada}) {
            title
            id
            fields {
               name
               value
               connectedRepoItems {
                  ... on PublicCard {
                     id
                     title
                  }
               }
            }
         }
      }`;

      try {
         const response = await fetch(PIPEFY_API_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${PIPEFY_TOKEN}`,
            },
            body: JSON.stringify({ query }),
         });

         if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

         const data = await response.json();

         // Filtra o campo específico "alunos_participantes" e extrai os IDs conectados
         const connectedIds: string[] = data.data.card.fields
            .filter((field: any) => field.name.trim() === "Alunos Participantes") // Filtra apenas o campo "Alunos Participantes"
            .flatMap((field: any) => field.connectedRepoItems || []) // Garante que só pega os itens conectados
            .map((item: any) => item.id); // Extrai os IDs

         //console.log("IDs conectados de 'Alunos Participantes':", connectedIds);

         if (connectedIds.includes(IdRemetente.toString())) {
            //console.log(`O aluno com ID ${IdRemetente} já está inserido na temporada.`);
            return [`O aluno com ID ${IdRemetente} já está inserido na temporada.`];
         }
         const UpdateMutationInTemporada = `
         mutation {
            updateCardField(input: {card_id: ${IdTemporada}, field_id: "alunos_participantes", new_value: [${[...connectedIds, IdRemetente].map(id => `"${id}"`).join(", ")}]}) {
               card {
                  title
               }
            }
         }
      `; const updateResponse = await fetch(PIPEFY_API_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${PIPEFY_TOKEN}`,
            },
            body: JSON.stringify({ query: UpdateMutationInTemporada }),
         });

         if (!updateResponse.ok) throw new Error(`Erro ao atualizar: ${updateResponse.status}`);

         console.log("Aluno adicionado com sucesso!");

         return [...connectedIds, IdRemetente.toString()]; // Retorna a nova lista de IDs
      } catch (error) {
         console.error("Erro ao buscar ou atualizar 'Alunos Participantes':", error);
         throw new Error("Erro ao carregar ou atualizar os IDs dos alunos participantes.");
      }
   }


   static async PegarDesafiosDaTemporada(IdTemporada: number): Promise<Desafio[]> {
      const query = `
      {
         card(id: ${IdTemporada}) {
            fields {
               name
               value
               connected_repo_items {
                  ... on Card {
                     id
                     fields {
                        name
                        value
                        date_value
                     }
                     title
                  }
               }
            }
         }
      }`;

      try {
         const response = await fetch(PIPEFY_API_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${PIPEFY_TOKEN}`,
            },
            body: JSON.stringify({ query }),
         });

         //console.log("Resposta da API:", response);

         if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

         const data = await response.json();
         //console.log("Resposta da API data:", JSON.stringify(data, null, 2));

         // Filtra o campo "Desafios da temporada" e retorna os desafios conectados
         const desafiosConectados: Desafio[] = data.data.card.fields
            .filter((field: any) => field.name.trim() === "Desafios da temporada")
            .flatMap((field: any) => field.connected_repo_items || [])
            .map((item: any) => {
               // Criar um objeto para armazenar os valores dos campos
               const campoMap: Record<string, string> = {};

               // Preencher os campos a partir do array fields[]
               item.fields.forEach((field: any) => {
                  campoMap[field.name.trim()] = field.value || "";
               });

               return {
                  id: item.id,
                  Titulo: item.title || "Sem título",
                  descricao: campoMap["Descrição"] || "Sem descrição",
                  pontos: campoMap["pontuação"] ? parseInt(campoMap["pontuação"], 10) : 0,
                  multiplicador: campoMap["multiplicador"] ? parseFloat(campoMap["multiplicador"]) : 1,
                  tempo_da_atividade: campoMap["tempo_da_atividade"] || "00:00",
                  Exigência_1: campoMap["Exigência_1"] || "",
                  Exigência_2: campoMap["Exigência_2"] || "",
                  Exigência_3: campoMap["Exigência_3"] || "",
                  Exigência_4: campoMap["Exigência_4"] || "",
                  AlunosQueRealizaram: campoMap["Alunos que realizaram a atividade"] || "",
                  links: campoMap["Links"] || "",
               };
            });

        // console.log("Desafios conectados:", desafiosConectados);
         return desafiosConectados;

      } catch (error) {
         console.error("Erro ao buscar desafios da temporada:", error);
         throw new Error("Erro ao carregar os desafios da temporada.");
      }
   }

}