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
): Promise<{ matchDetail: MatchSummaryType[]; scorePanel: ScorePanel }> => {
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
}

interface MatchFetcherContextType {
  matchIds: string[];
  matches: MatchSummaryType[] | undefined;
  scorePanel: ScorePanel | undefined;
  bestPlayer: any;
  isMatchIdsLoading: boolean;
  isMatchesLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MatchFetcherContext = createContext<MatchFetcherContextType | undefined>(
  undefined
);

export const useMatchFetcher = () => {
  const context = useContext(MatchFetcherContext);
  if (!context) {
    throw new Error("useMatchFetcher must be used within a MatchProvider");
  }
  return context;
};

const MatchProvider = ({ children }: MatchFetcherProps) => {
  // 페이지네이션
  const [page, setPage] = useState(0);
  const searchParams = useSearchParams();
  const ouid = searchParams.get("q") ?? "";

  const { data: matchIds, isLoading: isMatchIdsLoading } = useQuery(
    MatchQueries.getMatchIds(ouid, { limit: 5, offset: page * 5 })
  );

  const { data, isLoading: isMatchesLoading } = useQuery({
    queryKey: ["matchDetails", matchIds],
    queryFn: () =>
      matchIds
        ? fetchMatchDetails(matchIds)
        : Promise.resolve({
            matchDetail: [],
            scorePanel: { win: 0, defeat: 0, draw: 0, winRate: 0 },
          }),
    enabled: !!matchIds,
  });

  return (
    <MatchFetcherContext.Provider
      value={{
        matchIds,
        matches: data?.matchDetail,
        scorePanel: data?.scorePanel,
        bestPlayer: data?.bestPlayer,
        isMatchIdsLoading,
        isMatchesLoading,
        page,
        setPage,
      }}
    >
      {children}
    </MatchFetcherContext.Provider>
  );
};

export default MatchProvider;
