import { infiniteQueryOptions } from "@tanstack/react-query";
import { MATH_QUERY_KEY } from "./keys/queryKeys";
import { getMatchIdsApi, getMatchListApi } from "./api";
import { MatchDetailResponse } from "@/entities/fc-database/types";

export const MatchQueries = {
  infinityMatchQuery: (ouid: string, matchList: MatchDetailResponse[]) =>
    infiniteQueryOptions({
      queryKey: [MATH_QUERY_KEY.INFINITY, ouid],
      queryFn: async ({ pageParam = 1 }) => {
        const nextMatchIds = await getMatchIdsApi(ouid, pageParam, 20);
        const matchDetails = await getMatchListApi(nextMatchIds);
        return matchDetails;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined;
        return allPages.length + 1;
      },
      initialPageParam: 1,
      initialData: {
        pages: [matchList],
        pageParams: [1],
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }),
};
