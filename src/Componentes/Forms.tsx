"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlunoLoginAutenticacao } from "@/services/AlunoService"; 
import { Aluno } from "@/types/Aluno"; 

export function Login() {
  const [email, setEmail] = useState("");
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const storedAluno = localStorage.getItem("aluno");
    if (storedAluno) {
      setAluno(JSON.parse(storedAluno));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Buscando aluno com o email:", email);

    const alunoAutenticado = await AlunoLoginAutenticacao(email);

    //console.log("Aluno autenticado:", alunoAutenticado);

    if (alunoAutenticado) {
      setAluno(alunoAutenticado);
      localStorage.setItem("aluno", JSON.stringify(alunoAutenticado));
    } else {
      setError("Aluno não encontrado.");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    setAluno(null);
    localStorage.removeItem("aluno");
  };

  return (
    <div className="flex w-full max-w-sm items-center gap-1.5">
      <form onSubmit={handleLogin}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Login"}
        </button>
      </form>

      {aluno && (
        <div className="mt-4">
          <h3>Bem-vindo, {aluno.nome_do_aluno}!</h3>
          {/* Exiba outras informações do aluno se necessário */}
          <button onClick={handleLogout} className="mt-2 text-red-500">Logout</button>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
