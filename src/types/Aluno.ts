/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Aluno  {
   id: number | string | any ;
   nome_do_aluno: string;
   s_rie_do_aluno: string;
   email: string;
   senha_do_aluno: string;
   curso_do_wit: string;
   turma_do_wit: string;
   pontos_atuais: number;
   xp: number;
   advert_ncias: number;
   bitcoin: number;
   level: string;
   compras?: { name: string; value: string ; id: number }[];
   fields?: { name: string; value: string ; id: number }[];
};

