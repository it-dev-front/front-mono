import { queryOptions } from "@tanstack/react-query";
import { META_QUERY_KEY } from "./keys/queryKeys";
import { FcClient } from "@/entities/fc-database/lib/FcClient";

export const MetaQueries = {
  getPlayerMeta: () => {
    return queryOptions({
      queryKey: [META_QUERY_KEY.PLAYER],
      queryFn: () =>
        FcClient.get("Meta").then((api) => api.getSoccerPlayerMeta()),
      staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 데이터가 신선하다고 봄
      gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시 유지
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    });
  },
  getSeasonIdMeta: () => {
    return queryOptions({
      queryKey: [META_QUERY_KEY.SEASON_ID],
      queryFn: () => FcClient.get("Meta").then((api) => api.getSeasonIdMeta()),
      staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 데이터가 신선하다고 봄
      gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시 유지
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    });
  },
};
