"use client";

import { ReactElement } from "react";
import { RotateCcw } from "lucide-react";

interface ScoreRefreshProps {
  updatedAt: string;
  onRefresh: () => void;
}

export const ScoreRefresh = ({
  updatedAt,
}: Pick<ScoreRefreshProps, "updatedAt">) => {
  const handleClickOnRefresh = (): void => {
    alert("새로고침");
  };

  return (
    <div className="flex flex-col items-center gap-[8px] text-sm text-gray-400">
      <p className="text-[14px] w-full text-right">{updatedAt} 업데이트</p>
      <ScoreRefreshButton onRefresh={handleClickOnRefresh} />
    </div>
  );
};

export const ScoreRefreshButton = ({
  onRefresh,
}: Pick<ScoreRefreshProps, "onRefresh">): ReactElement => {
  return (
    <button
      onClick={onRefresh}
      className="flex items-center justify-center gap-1 w-[120px] h-[40px] bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white text-m px-3 py-1.5 rounded-md transition"
    >
      전적갱신
      <RotateCcw size={14} className="text-lime-400" />
    </button>
  );
};
