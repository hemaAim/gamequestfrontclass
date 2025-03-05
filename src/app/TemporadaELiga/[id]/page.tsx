"use client"
import { useParams } from "next/navigation";

export default function TemporadaELigaID() { 
   const params = useParams();
   const id = Array.isArray(params.id) ? params.id[0] : params.id; // Se for array, pega o primeiro elemento
   return ( 

<h1>oi</h1>
   )
}