
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MarketplaceService } from "../services/marketplaceService";
import { Marketplaces} from "@/types/Marketplace";

export function useMarketplace() {
   const [marketplace, setMarketplace] = useState<Marketplaces[]>([]);
   const [loading, setLoading] = useState(true);
   const [erro, setErro] = useState<string | null>(null);

   useEffect(() => {
      async function carregarDesafios() {
         try {
            const data = await MarketplaceService.buscarMarketplace();
            setMarketplace(data);
         } catch (error: any) {
            setErro(error.message);
         } finally {
            setLoading(false);
         }
      }

      carregarDesafios();
   }, []);

   return { marketplace, loading, erro };
}
