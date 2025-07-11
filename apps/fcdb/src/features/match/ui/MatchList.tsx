"use client";

import { ReactElement, useMemo } from "react";
import {
  convertMatchInfo,
  convertPlayers,
  covertMatchStatus,
} from "@/entities/match/lib/getMatchInfo";
import { MatchSummaryType } from "@/entities/match/types/match.info.types";
import { UserProfileFetcher } from "@/features/profile/ui/UserProfileFetcher";
import { BallSpinner } from "@/shared/ui/spinner/BallSpinner";
import MatchSummary from "@/features/match/ui/MatchSummary";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMatchIds, getMatchList } from "@/entities/match/model/api";
import { MATH_QUERY_KEY } from "@/entities/match/model/keys/queryKeys";

interface MatchListProps {
  ouid: string;
}

const Loading = (): ReactElement => {
  return (
    <div className="w-full flex justify-center items-center my-5 h-[48px]">
      <BallSpinner />
    </div>
  );
};

export const MatchList = ({ ouid }: MatchListProps): ReactElement => {
  const { data: matchIds, isLoading: isInitialLoading } = useQuery({
    queryKey: [MATH_QUERY_KEY.IDS, ouid],
    queryFn: () => getMatchIds(ouid, 1, 20),
  });

  const { data: initialMatches, isLoading: isLoadingMatchDetails } = useQuery({
    queryKey: [MATH_QUERY_KEY.DETAIL, ouid],
    queryFn: () => getMatchList(matchIds ?? []),
    enabled: !!matchIds,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [MATH_QUERY_KEY.INFINITY, ouid],
      queryFn: async ({ pageParam = 1 }) => {
        const matchIds = await getMatchIds(ouid, pageParam, 20);
        if (matchIds.length === 0) return [];

        const matchDetails = await getMatchList(matchIds);
        return matchDetails;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined;
        return allPages.length + 1;
      },
      enabled: !!initialMatches,
      initialPageParam: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  const infiniteSummaries = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) =>
      page.map((match) => {
        const { matchInfo } = match;
        const info = convertMatchInfo(matchInfo);
        const status = covertMatchStatus(match);
        const players = convertPlayers(matchInfo);

        return {
          matchInfo: info,
          matchStatus: status,
          matchPlayers: players,
          matches: match,
        };
      })
    );
  }, [data]);

  return (
    <div className="w-full min-w-[366px] flex flex-col min-h-screen pt-[50px]">
      {isLoading || isInitialLoading || isLoadingMatchDetails ? (
        <Loading />
      ) : (
        <>
          <UserProfileFetcher ouid={ouid} updatedAt={new Date()} />
          <div className="w-full flex flex-col justify-center items-center gap-4">
            {infiniteSummaries?.map(
              (match: MatchSummaryType, index: number) => (
                <div
                  key={`${index}_match_list`}
                  className="w-full flex justify-center items-center"
                >
                  <MatchSummary match={match} />
                </div>
              )
            )}
          </div>
          <div className="w-full flex justify-center items-center my-5">
            {isFetchingNextPage ? (
              <Loading />
            ) : (
              <button
                type="button"
                className="bg-primary-300 text-white px-4 py-2 rounded-md w-[244px] h-[48px] cursor-pointer"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage || isLoading}
              >
                더 보기
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
