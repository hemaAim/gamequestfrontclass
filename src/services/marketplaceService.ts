import { Marketplaces } from "@/types/Marketplace";
const PIPEFY_API_URL = process.env.NEXT_PUBLIC_PIPEFY_API_URL!;
const PIPEFY_TOKEN = process.env.NEXT_PUBLIC_PIPEFY_TOKEN

export class MarketplaceService {

   private static readonly PIPEFY_API_URL = PIPEFY_API_URL;
   private static readonly PIPEFY_TOKEN = PIPEFY_TOKEN

   static async buscarMarketplace(): Promise<Marketplaces[]> {
      const query = `
         {
            cards(pipe_id: 305775406) {
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

         return data.data.cards.edges.map((edge: any) => {
            const fields = edge.node.fields.reduce((acc: any, field: any) => {
               acc[field.name.trim()] = field.value;
               return acc;
            }, {});

            return {
               id: edge.node.id,
               Titulo: fields["Nome do Produto"] || "Sem Título",
               Price: Number(fields["Preço"]?.replace(/[^\d,.-]/g, "").replace(",", ".") || 0), // Tratamento do valor
               Descricao: fields["Descrição"] || "Sem Descrição",
               TempoDeEntrega: fields["Tempo de Entrega"] || "Desconhecido",
               CategoriaDoPRoduto: JSON.parse(fields["Categoria do Produto"] || "[]")[0] || "Não informado",
               IsOculosVrImg: Number(fields["IsOculosVrImg"]) || 0

            };
         });
      } catch (error) {
         console.error("Erro ao buscar os produtos do marktplace:", error);
         throw new Error("Erro ao carregar marktplace.");
      }
   }
}
