import { queryOptions } from "@tanstack/react-query";
import { PROFILE_QUERY_KEY } from "./keys/queryKeys";
import { FcClient } from "@/entities/fc-database/lib/FcClient";

export const ProfileQueries = {
  getUserProfile: (ouid: string) => {
    return queryOptions({
      queryKey: [PROFILE_QUERY_KEY.BASIC, ouid],
      queryFn: () => FcClient.get("User").then((api) => api.getUserInfo(ouid)),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    });
  },

  getUserBestRating: (ouid: string) => {
    return queryOptions({
      queryKey: [PROFILE_QUERY_KEY.BEST_RATING, ouid],
      queryFn: () =>
        FcClient.get("User").then((api) => api.getUserBestRating(ouid)),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    });
  },
};
