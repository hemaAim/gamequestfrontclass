/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface DetalhesProps {

  alunoSelecionado: any,
  setAlunoSelecionado: any,
  valorTransferencia: any,
  setValorTransferencia: any,

  handleTransferencia: any
}

const DetalhesAlunoModal = ({
  alunoSelecionado,
  setAlunoSelecionado,
  valorTransferencia,
  setValorTransferencia,

  handleTransferencia,
}: DetalhesProps) => {
  if (!alunoSelecionado) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-gray-800 rounded-lg shadow  sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-white">
              Detalhes do Aluno
            </h3>
            <button
              type="button"
              onClick={() => setAlunoSelecionado(null)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white w-12 h-10"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form onSubmit={(event) => {
            event.preventDefault(); // Impede o recarregamento da página
            console.log("Formulário enviado!");
          }} >
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              {[
                { label: "Nome", field: "Nome do Aluno" },
                { label: "Série WIT", field: "Turma do WIT" },
                { label: "XP's", field: "XP", suffix: "⭐" },
                { label: "Bitcoin", field: "Bitcoin" },
              ].map(({ label, field, suffix = "" }) => (
                <div key={field}>
                  <label className="block mb-2 text-base font-bold text-gray-400">
                    {label}
                  </label>
                  <p className="text-white">
                    {alunoSelecionado.fields.find((f: any) => f.name === field)?.value || "-"} {suffix}
                  </p>
                </div>
              ))}
            </div>
            <label className="block mb-2 text-sm font-medium  text-white">
              Insira o valor a transferir:
            </label>
            <input
              type="number"
              value={valorTransferencia}
              onChange={e => setValorTransferencia(Number(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digite o valor"
            />

            <button
              onClick={() => { handleTransferencia() }}
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded-sm hover:bg-blue-700"
            >
              Transferir
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default DetalhesAlunoModal;
