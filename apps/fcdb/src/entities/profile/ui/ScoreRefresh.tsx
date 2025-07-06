"use client";

import { ReactElement, useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { MATH_QUERY_KEY } from "@/entities/match/model/keys/queryKeys";

interface ScoreRefreshProps {
  updatedAt: Date;
  onRefresh: () => void;
}

const refreshMatch = (queryClient: QueryClient) => {
  queryClient.resetQueries({ queryKey: [MATH_QUERY_KEY.IDS] });
  queryClient.resetQueries({ queryKey: [MATH_QUERY_KEY.LIST] });
  queryClient.resetQueries({ queryKey: [MATH_QUERY_KEY.DETAIL] });
  queryClient.resetQueries({ queryKey: [MATH_QUERY_KEY.INFINITY] });
};

const getTimeAgo = (updatedAt: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - updatedAt.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return `업데이트 ${diffSeconds}초 전`;
  } else if (diffMinutes < 60) {
    return `업데이트 ${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `업데이트 ${diffHours}시간 전`;
  } else {
    return `업데이트 ${diffDays}일 전`;
  }
};

export const ScoreRefresh = ({
  updatedAt: initialUpdatedAt,
}: Pick<ScoreRefreshProps, "updatedAt">) => {
  const [updatedAt, setUpdatedAt] = useState<Date>(initialUpdatedAt);
  const [timeAgo, setTimeAgo] = useState<string>(getTimeAgo(initialUpdatedAt));

  const queryClient = useQueryClient();

  const handleClickOnRefresh = (): void => {
    refreshMatch(queryClient);
    const now = new Date();
    setUpdatedAt(now);
    setTimeAgo(getTimeAgo(now));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(updatedAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [updatedAt]);

  return (
    <div className="flex flex-col items-center gap-[8px] text-sm text-gray-400">
      <p className="text-[14px] w-full text-right">{timeAgo} 업데이트</p>
      <ScoreRefreshButton onRefresh={handleClickOnRefresh} />
    </div>
  );
};

export const MobileScoreRefresh = ({
  updatedAt: initialUpdatedAt,
}: Pick<ScoreRefreshProps, "updatedAt">) => {
  const [updatedAt, setUpdatedAt] = useState<Date>(initialUpdatedAt);
  const [timeAgo, setTimeAgo] = useState<string>(getTimeAgo(initialUpdatedAt));

  const queryClient = useQueryClient();

  const handleClickOnRefresh = (): void => {
    refreshMatch(queryClient);
    const now = new Date();
    setUpdatedAt(now);
    setTimeAgo(getTimeAgo(now));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(updatedAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [updatedAt]);

  return (
    <div className="w-full flex flex-col items-center gap-[8px] text-sm text-gray-400">
      <p className="text-[14px] w-full text-right">{timeAgo} 업데이트</p>
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
