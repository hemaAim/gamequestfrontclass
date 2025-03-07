import React from "react";

export function SkeletonDashboard() {
  return (
    <div className="  w-screen  max-w-5xl flex flex-col items-center gap-3 p-2">
      {/* Skeleton do Header */}
      <div className="w-full h-12 bg-gray-700 animate-pulse rounded-lg"></div>

      {/* Skeleton do CardMoneyQuestCoin */}
      <div className="w-48 h-24 bg-gray-700 animate-pulse rounded-lg"></div>

      {/* Skeleton do CardLevelUp */}
  

      {/* Skeleton do Texto "Bem-vindo, aluno" */}
      <div className="w-80 h-10 bg-gray-700 animate-pulse rounded-lg mt-4"></div>

      {/* Skeleton dos 3 Cards */}
      <div className="flex mt-20 w-full justify-between  items-center">
        <div className="w-60 h-40 bg-gray-700 animate-pulse rounded-lg"></div>
        <div className="w-60 h-40 bg-gray-700 animate-pulse rounded-lg"></div>
        <div className="w-60 h-40 bg-gray-700 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
}
