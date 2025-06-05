import { queryOptions } from "@tanstack/react-query";
import { MATH_QUERY_KEY } from "./keys/queryKeys";
import { FcClient } from "@/entities/fc-database/lib/FcClient";

export const MatchQueries = {
  getMatchList: (ouid: string) => {
    return queryOptions({
      queryKey: [MATH_QUERY_KEY.LIST, ouid],
      queryFn: () =>
        FcClient.get("Match").then((api) => api.getMatchInfo(ouid)),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    });
  },
  getMatchDetail: (matchId: string) => {
    return queryOptions({
      queryKey: [MATH_QUERY_KEY.DETAIL, matchId],
      queryFn: () =>
        FcClient.get("Match").then((api) => api.getMatchDetail(matchId)),
    });
  },
};
