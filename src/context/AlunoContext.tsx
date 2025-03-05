"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { Aluno } from "@/types/Aluno";
import { AlunoLoginAutenticacao } from "@/services/AlunoService";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/localStorageService";

interface AlunoContextType {
  aluno: Aluno | null;
  carregarAluno: (email: string) => Promise<void>;
  logout: () => void;
}

const AlunoContext = createContext<AlunoContextType | undefined>(undefined);

export function AlunoProvider({ children }: { children: ReactNode }) {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const router = useRouter();

  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (!aluno) return;

    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, 600000); // 10 minutos
  };


  // Inicializa o aluno com dados do localStorage
  useEffect(() => {
    const storedAluno = StorageService.getItem<Aluno>("aluno");
    if (storedAluno) {
      setAluno(storedAluno);
      resetTimer(); // Reinicia o timer ao carregar o aluno
    }
  }, []);

  const carregarAluno = async (email: string) => {
    const alunoAutenticado = await AlunoLoginAutenticacao(email);
    if (alunoAutenticado) {
      setAluno(alunoAutenticado);
      StorageService.setItem("aluno", alunoAutenticado);
      resetTimer(); // Reinicia o timer ao fazer login
    }
  };

  const logout = () => {
    setAluno(null);
    StorageService.removeItem("aluno");

    // Só redireciona se o usuário **não** estiver já na página de login
    if (window.location.pathname !== "/login") {
      router.push("/login");
    }
  };

  // Adiciona event listeners para resetar o timer em qualquer interação do usuário
  useEffect(() => {
    if (!aluno) return; // Evita que event listeners sejam adicionados se o aluno não estiver logado

    const handleActivity = () => resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [aluno]); // Só adiciona os event listeners quando `aluno` estiver definido

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
