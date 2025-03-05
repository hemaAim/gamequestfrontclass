import { useState, useEffect } from "react";
import { TemporadaELigaService } from "../services/Temporada&LigaService";

import { TemporadaELiga } from "@/types/TemporadaELiga";

export function useTemporadaELiga(PhaseNumberId: number) {
   const [temporadaELiga, setTemporadaELiga] = useState<TemporadaELiga[]>([]);
   const [loading, setLoading] = useState(true);
   const [erro, setErro] = useState<string | null>(null);

   useEffect(() => {
      async function carregarTemporadaELiga() {
         try {
            const data = await TemporadaELigaService.PegandoDadosTeporadaELiga(PhaseNumberId);
            setTemporadaELiga(data);
         } catch (error: any) {
            setErro(error.message);
         } finally {
            setLoading(false);
         }
      }

      carregarTemporadaELiga();
   }, []);

   return { temporadaELiga, loading, erro };
}
