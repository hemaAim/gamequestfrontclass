"use client"
import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";
import { Adm } from "@/types/ADM";
import { AdmLoginAutenticacao } from "@/services/AdmService";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/localStorageService";

interface ProfessorContextType {
  professor: Adm | null;
  carregarProfessor: (email: string) => Promise<void>;
  logout: () => void;
}

const ProfessorContext = createContext<ProfessorContextType | undefined>(undefined);

export function ProfessorProvider({ children }: { children: ReactNode }) {
  const [professor, setProfessor] = useState<Adm | null>(null);
  const router = useRouter();

  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Usando useCallback para evitar recriação da função em cada render
  const resetTimer = useCallback(() => {
    if (!professor) return;

    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, 600000); // 10 minutos
  }, [professor]); // Dependendo apenas de `professor`

  // Inicializa o professor com dados do localStorage
  useEffect(() => {
    const storedProfessor = StorageService.getItem<Adm>("professor");
    if (storedProfessor) {
      setProfessor(storedProfessor);
      resetTimer(); // Reinicia o timer ao carregar o professor
    }
  }, [resetTimer]);

  const carregarProfessor = async (email: string) => {
    const professorAutenticado = await AdmLoginAutenticacao(email);
    if (professorAutenticado) {
      setProfessor(professorAutenticado);
      StorageService.setItem("professor", professorAutenticado);
      resetTimer(); // Reinicia o timer ao fazer login
    }
  };

  const logout = useCallback(() => {
    setProfessor(null);
    StorageService.removeItem("professor");

    if (window.location.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  // Adiciona event listeners para resetar o timer em qualquer interação do usuário
  useEffect(() => {
    if (!professor) return;

    const handleActivity = () => resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [professor, resetTimer]);

  return (
    <ProfessorContext.Provider value={{ professor, carregarProfessor, logout }}>
      {children}
    </ProfessorContext.Provider>
  );
}

export function useProfessor() {
  const context = useContext(ProfessorContext);
  if (!context) {
    throw new Error("useProfessor deve ser usado dentro de um ProfessorProvider");
  }
  return context;
}
