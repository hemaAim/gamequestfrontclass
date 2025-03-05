
import { AlunoLoginAutenticacao } from "./AlunoService";



export class StorageService {
   static setItem(key: string, value: any): void {
     if (typeof window !== "undefined") {
       sessionStorage.setItem(key, JSON.stringify(value)); // Usar sessionStorage
     }
   }
 
   static getItem<T>(key: string): T | null {
     if (typeof window !== "undefined") {
       const item = sessionStorage.getItem(key);
       return item ? JSON.parse(item) : null;
     }
     return null;
   }
 
   static removeItem(key: string): void {
     if (typeof window !== "undefined") {
       sessionStorage.removeItem(key);
     }
   }
 }
 


export function AlunoAtualizacao(aluno: any, setAluno: (aluno: any) => void) {
   if (!aluno?.email) return;

   const fetchAlunoData = async () => {
      const updatedAluno = await AlunoLoginAutenticacao(aluno.email);
      if (updatedAluno && JSON.stringify(updatedAluno) !== JSON.stringify(aluno)) {
         setAluno(updatedAluno);
         StorageService.setItem("aluno", updatedAluno);
      }
   };

   // Buscar a cada 10 segundos
   const intervalId = setInterval(fetchAlunoData, 4000);

   return () => clearInterval(intervalId);
}
