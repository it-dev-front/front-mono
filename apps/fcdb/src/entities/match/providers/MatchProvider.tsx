"use client";

import { getScorePanel } from "@/entities/match/lib/getMatchInfo";
import { MatchSummaryType } from "@/entities/match/types/match.info.types";
import { useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";
import {
  PlayerType,
  MatchPlayerInfoType,
} from "@/entities/match/types/match.types";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useMatchInfinityScroll } from "../hooks/useMatchInfinityScroll";

// ScorePanel 타입 직접 정의
type ScorePanel = {
  win: number;
  defeat: number;
  draw: number;
  winRate: number;
  total: number;
};

interface MatchFetcherProps {
  children: React.ReactNode;
}

interface MatchFetcherContextType {
  matches: MatchSummaryType[] | undefined;
  scorePanel: ScorePanel;
  bestPlayer: PlayerType | null;
}

const MatchFetcherContext = createContext<MatchFetcherContextType | undefined>(
  undefined
);

const getBestPlayer = (bestPlayerList: { bestPlayer: PlayerType | null }[]) => {
  const validPlayers = bestPlayerList
    .map((item) => item.bestPlayer)
    .filter((player): player is PlayerType => player !== null);

  if (validPlayers.length === 0) return null;

  return validPlayers.reduce((prev, current) => {
    const prevScore = prev.status.goal + prev.status.assist + prev.status.shoot;
    const currentScore =
      current.status.goal + current.status.assist + current.status.shoot;

    return currentScore > prevScore ? current : prev;
  });
};

export const useMatchFetcher = () => {
  const context = useContext(MatchFetcherContext);
  if (!context) {
    throw new Error("useMatchFetcher must be used within a MatchProvider");
  }
  return context;
};

const MatchProvider = ({ children }: MatchFetcherProps) => {
  const searchParams = useSearchParams();
  const ouid = searchParams.get("q") ?? "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMatchInfinityScroll({
      ouid,
    });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const matches = data?.pages.map((page) => page.matchDetail).flat();
  const matchPlayers = matches?.map((page) => page.matchPlayers).flat() || [];
  const bestPlayer = getBestPlayer(matchPlayers);
  const scorePanel = getScorePanel(
    matches
      ?.map((page) => page.matches[0])
      .filter((match): match is MatchPlayerInfoType => match !== undefined) ||
      []
  );

  return (
    <>
      <MatchFetcherContext.Provider
        value={{
          matches,
          scorePanel,
          bestPlayer,
        }}
      >
        {children}
        {isFetchingNextPage ? (
          <div>로딩</div>
        ) : (
          <div className="h-[100px]" ref={setTarget} />
        )}
      </MatchFetcherContext.Provider>
    </>
  );
};

export default MatchProvider;
