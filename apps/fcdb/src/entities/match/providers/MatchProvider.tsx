"use client";

import { FcClient } from "@/entities/fc-database/lib/FcClient";
import {
  convertPlayers,
  convertMatchInfo,
  covertMatchStatus,
  getScorePanel,
} from "@/entities/match/lib/getMatchInfo";
import { MatchQueries } from "@/entities/match/model/queries";
import { MatchSummaryType } from "@/entities/match/types/match.info.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createContext, useContext } from "react";
import {
  MatchPlayerInfoType,
  PlayerType,
} from "@/entities/match/types/match.types";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useMatchInfinityScroll } from "../hooks/useMatchInfinityScroll";
import { BallSpinner } from "@/shared/ui/spinner/BallSpinner";

// ScorePanel 타입 직접 정의
type ScorePanel = {
  win: number;
  defeat: number;
  draw: number;
  winRate: number;
};

// 매치 상세 조회
export const fetchMatchDetails = async (
  matchIds: string[]
): Promise<{
  matchDetail: MatchSummaryType[];
  scorePanel: ScorePanel;
  bestPlayer: PlayerType & { total: number };
}> => {
  const matchApi = await FcClient.get("Match");
  const scoreList: MatchPlayerInfoType[][] = [];
  const bestPlayerList = [];

  const matchDetailPromises: Promise<MatchSummaryType>[] = matchIds.map(
    async (matchId) => {
      const response = await matchApi.getMatchDetail(matchId);
      scoreList.push(response.matchInfo);
      const matchStatus = covertMatchStatus(response);
      const matchInfo = convertMatchInfo(response.matchInfo);
      const matchPlayers = convertPlayers(response.matchInfo);

      if (matchPlayers && matchPlayers[0] && matchPlayers[0].bestPlayer) {
        bestPlayerList.push(matchPlayers[0].bestPlayer);
      }

      return {
        matchInfo,
        matchStatus,
        matchPlayers,
      };
    }
  );
  const matchDetail = await Promise.all(matchDetailPromises);
  const scorePanel = getScorePanel(scoreList);
  const bestPlayer = bestPlayerList.reduce((prev, current) =>
    prev.total > current.total ? prev : current
  );

  return {
    matchDetail,
    scorePanel,
    bestPlayer,
  };
};

interface MatchFetcherProps {
  children: React.ReactNode;
  ouid: string;
}

interface MatchFetcherContextType {
  matches: MatchSummaryType[] | undefined;
  scorePanel: any;
  bestPlayer: any;
  isMatchIdsLoading: boolean;
  isMatchesLoading: boolean;
}

const MatchFetcherContext = createContext<MatchFetcherContextType | undefined>(
  undefined
);

const getBestPlayer = (bestPlayerList: any[]) => {
  console.log(bestPlayerList);
  return bestPlayerList.length > 0
    ? bestPlayerList.reduce((prev, current) =>
        prev.total > current.total ? prev : current
      )
    : null;
};

export const useMatchFetcher = () => {
  const context = useContext(MatchFetcherContext);
  if (!context) {
    throw new Error("useMatchFetcher must be used within a MatchProvider");
  }
  return context;
};

const MatchProvider = ({ children, ouid }: MatchFetcherProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMatchInfinityScroll({
      ouid,
    });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const matches = data?.pages.map((page) => page.matchDetail).flat();
  // const matchInfo = data?.pages.map((page) => page.matchInfo).flat();
  // const scorePanel = getScorePanel(matchInfo ?? []);
  // const bestPlayer = getBestPlayer(matchInfo ?? []);

  return (
    <>
      <MatchFetcherContext.Provider
        value={{
          matches,
          scorePanel: [],
          bestPlayer: [],
          isMatchIdsLoading: isLoading,
          isMatchesLoading: isLoading,
        }}
      >
        {children}
        {isFetchingNextPage ? (
          <div className="flex justify-center items-center py-[30px]">
            <BallSpinner />
          </div>
        ) : (
          <div className="h-[1px]" ref={setTarget} />
        )}
      </MatchFetcherContext.Provider>
    </>
  );
};

export default MatchProvider;
