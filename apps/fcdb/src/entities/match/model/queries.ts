import { queryOptions } from "@tanstack/react-query";
import { MATH_QUERY_KEY } from "./keys/queryKeys";
import { FcClient } from "@/entities/fc-database/lib/FcClient";

export const MatchQueries = {
  getMatchIds: (ouid: string, { limit = 10, offset = 0 }) => {
    return queryOptions({
      queryKey: [MATH_QUERY_KEY.IDS, ouid, limit, offset],
      queryFn: async () => {
        const api = await FcClient.get("User");
        return api.getUserMatchList({
          ouid,
          matchtype: 50,
          limit,
          offset,
        });
      },
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
    });
  },
  getMatchDetail: (matchId: string) => {
    return queryOptions({
      queryKey: [MATH_QUERY_KEY.DETAIL, matchId],
      queryFn: async () => {
        const api = await FcClient.get("Match");
        return api.getMatchDetail(matchId);
      },
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
    });
  },
};
