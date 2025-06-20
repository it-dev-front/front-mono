"use client";

import { ReactElement } from "react";
import { RotateCcw } from "lucide-react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { MATH_QUERY_KEY } from "@/entities/match/model/keys/queryKeys";

// TODO 쿼리 캐시 초기화

interface ScoreRefreshProps {
  updatedAt: string;
  onRefresh: () => void;
}

const refreshMatch = (queryClient: QueryClient) => {
  queryClient.resetQueries({ queryKey: [MATH_QUERY_KEY.IDS] });
  queryClient.resetQueries({ queryKey: [MATH_QUERY_KEY.LIST] });
  queryClient.resetQueries({ queryKey: [MATH_QUERY_KEY.DETAIL] });
};

export const ScoreRefresh = ({
  updatedAt,
}: Pick<ScoreRefreshProps, "updatedAt">) => {
  const queryClient = useQueryClient();
  const handleClickOnRefresh = (): void => refreshMatch(queryClient);

  return (
    <div className="flex flex-col items-center gap-[8px] text-sm text-gray-400">
      <p className="text-[14px] w-full text-right">{updatedAt} 업데이트</p>
      <ScoreRefreshButton onRefresh={handleClickOnRefresh} />
    </div>
  );
};

export const MobileScoreRefresh = ({
  updatedAt,
}: Pick<ScoreRefreshProps, "updatedAt">) => {
  const queryClient = useQueryClient();
  const handleClickOnRefresh = (): void => refreshMatch(queryClient);

  return (
    <div className="w-full flex flex-col items-center gap-[8px] text-sm text-gray-400">
      <p className="text-[14px] w-full text-right">{updatedAt} 업데이트</p>
      <MobileScoreRefreshButton onRefresh={handleClickOnRefresh} />
    </div>
  );
};

export const ScoreRefreshButton = ({
  onRefresh,
}: Pick<ScoreRefreshProps, "onRefresh">): ReactElement => {
  return (
    <button
      onClick={onRefresh}
      type="button"
      aria-label="전적 갱신 버튼"
      className="flex items-center justify-center gap-1 w-[120px] h-[40px] bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white text-m px-3 py-1.5 rounded-md transition"
    >
      전적갱신
      <RotateCcw size={14} className="text-primary-300" />
    </button>
  );
};

export const MobileScoreRefreshButton = ({
  onRefresh,
}: Pick<ScoreRefreshProps, "onRefresh">): ReactElement => {
  return (
    <button
      type="button"
      onClick={onRefresh}
      aria-label="전적 갱신 버튼"
      className="flex items-center justify-center gap-1 w-full h-[40px] bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white text-m px-3 py-1.5 rounded-md transition"
    >
      전적갱신
      <RotateCcw size={14} className="text-primary-300" />
    </button>
  );
};
