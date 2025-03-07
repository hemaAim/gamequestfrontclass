"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";
import { Aluno } from "@/types/Aluno";
import { AlunoLoginAutenticacao } from "@/services/AlunoService";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/localStorageService";

interface AlunoContextType {
  aluno: Aluno | null;
  carregarAluno: (email: string) => Promise<Aluno | null>; // Agora retorna Aluno | null
  logout: () => void;
}


const AlunoContext = createContext<AlunoContextType | undefined>(undefined);

export function AlunoProvider({ children }: { children: ReactNode }) {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const router = useRouter();
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);



  const logout = useCallback(() => {
    setAluno(null);
    sessionStorage.clear();
    StorageService.removeItem("aluno"); // Garante que os dados do aluno são removidos

    if (window.location.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  const resetTimer = useCallback(() => {
    if (!aluno) return;

    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, 600000); // 10 minutos
  }, [aluno, logout]);

  const carregarAluno = async (email: string): Promise<Aluno | null> => {
    const alunoAutenticado = await AlunoLoginAutenticacao(email);
  
    if (alunoAutenticado && alunoAutenticado.email) {
      setAluno(alunoAutenticado);
      StorageService.setItem("aluno", alunoAutenticado);
      resetTimer(); // Reinicia o timer ao fazer login
      return alunoAutenticado;
    } else { 
      console.log("email invalido", email);
      logout();
      return null;
    }
  };
  

  // Adiciona event listeners para resetar o timer em qualquer interação do usuário
  useEffect(() => {
    if (!aluno) return;

    const handleActivity = () => resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aluno]);

  return (
    <AlunoContext.Provider value={{ aluno, carregarAluno, logout }}>
      {children}
    </AlunoContext.Provider>
  );
}

export function useAluno() {
  const context = useContext(AlunoContext);
  if (!context) {
    throw new Error("useAluno deve ser usado dentro de um AlunoProvider");
  }
  return context;
}
