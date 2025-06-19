"use client";

import { FcClient } from "@/entities/fc-database/lib/FcClient";
import {
  conertPlayers,
  convertMatchInfo,
  covertMatchStatus,
} from "@/entities/match/lib/getMatchInfo";
import { MatchQueries } from "@/entities/match/model/queries";
import { MatchSummaryType } from "@/entities/match/types/match.info.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createContext, useContext } from "react";

// 매치 상세 조회
export const fetchMatchDetails = async (matchIds: string[]) => {
  const matchApi = await FcClient.get("Match");
  const matchDetailPromises = matchIds.map(async (matchId) => {
    const response = await matchApi.getMatchDetail(matchId);
    const matchStatus = covertMatchStatus(response);
    const matchInfo = convertMatchInfo(response.matchInfo);
    const matchPlayers = conertPlayers(response.matchInfo);

    return {
      matchInfo,
      matchStatus,
      matchPlayers,
    };
  });
  return Promise.all(matchDetailPromises);
};

interface MatchFetcherProps {
  children: React.ReactNode;
}

interface MatchFetcherContextType {
  matchIds: string[];
  matches: MatchSummaryType[] | undefined;
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

  const { data: matches, isLoading: isMatchesLoading } = useQuery({
    queryKey: ["matchDetails", matchIds],
    queryFn: () => (matchIds ? fetchMatchDetails(matchIds) : []),
    enabled: !!matchIds,
  });

  return (
    <MatchFetcherContext.Provider
      value={{
        matchIds,
        matches,
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
