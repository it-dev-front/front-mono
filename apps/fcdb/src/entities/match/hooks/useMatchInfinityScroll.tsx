import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MatchSummaryType } from "../types/match.info.types";
import { convertPlayers, covertMatchStatus } from "../lib/getMatchInfo";
import { convertMatchInfo } from "../lib/getMatchInfo";
import { MATH_QUERY_KEY } from "../model/keys/queryKeys";

export const useMatchInfinityScroll = ({ ouid }: { ouid: string }) => {
  return useInfiniteQuery({
    queryKey: [MATH_QUERY_KEY.INFINITY, ouid],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const page = pageParam as unknown as number;
        const offset = (page - 1) * 5;

        const matchApi = await FcClient.get("Match");
        const userApi = await FcClient.get("User");

        const matchIds = await userApi.getUserMatchList({
          ouid,
          matchtype: 50,
          limit: 5,
          offset,
        });

        const matchDetailPromises: Promise<MatchSummaryType>[] = matchIds.map(
          async (matchId: string) => {
            const response = await matchApi.getMatchDetail(matchId);

            const matchStatus = covertMatchStatus(response);
            const matchInfo = convertMatchInfo(response.matchInfo);
            const matchPlayers = convertPlayers(response.matchInfo);

            return {
              matchInfo,
              matchStatus,
              matchPlayers,
              matches: response.matchInfo,
            };
          }
        );
        const matchDetail = await Promise.all(matchDetailPromises);
        return {
          matchDetail,
        };
      } catch (e: unknown) {
        if (e instanceof Error) {
          return {
            matchDetail: [],
          };
        }

        throw e;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (
        !lastPage ||
        !lastPage.matchDetail ||
        lastPage.matchDetail.length === 0
      ) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};
