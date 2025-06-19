"use client";

import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { useQuery } from "@tanstack/react-query";
import { MatchQueries } from "@/entities/match/model/queries";
import { fetchMatchDetails } from "@/features/match/ui/MatchSummaryFetcher";

/**
 * @description 매치 관련 훅
 */

const useMatch = () => {
  const getMatchClient = async () => {
    return FcClient.get("Match");
  };

  const getMatchIds = async (
    ouid: string,
    { limit, offset }: { limit: number; offset: number }
  ) => {
    const matchClient = await getMatchClient();
    useQuery(MatchQueries.getMatchIds(ouid, { limit, offset }));
    const response = await matchClient.getMatchIds(ouid, { limit, offset });
    return response;
  };

  const getMatchDetail = async (matchId: string) => {
    const matchClient = await getMatchClient();
  };
};

export const useMatchIds = (
  ouid: string,
  { limit = 5, offset = 0 }: { limit?: number; offset?: number }
) => {
  return useQuery(MatchQueries.getMatchIds(ouid, { limit, offset }));
};

export const useMatchDetails = (matchIds: string[] | undefined) => {
  return useQuery({
    queryKey: ["matchDetails", matchIds],
    queryFn: () => (matchIds ? fetchMatchDetails(matchIds) : []),
    enabled: !!matchIds,
  });
};

export default useMatch;
