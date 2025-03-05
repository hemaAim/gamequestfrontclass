import { useState, useEffect } from "react";
import { DesafioService } from "../services/DesafioService";
import { Desafio } from "@/types/Desafios";

export function useDesafios(NumberId: number) {
   const [desafios, setDesafios] = useState<Desafio[]>([]);
   const [loading, setLoading] = useState(true);
   const [erro, setErro] = useState<string | null>(null);

   useEffect(() => {
      async function carregarDesafios() {
         try {
            const data = await DesafioService.buscarDesafios(NumberId);
            setDesafios(data);
         } catch (error: any) {
            setErro(error.message);
         } finally {
            setLoading(false);
         }
      }

      carregarDesafios();
   }, []);

   return { desafios, loading, erro };
}
