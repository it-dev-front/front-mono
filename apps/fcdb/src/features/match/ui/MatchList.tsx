"use client";

import { ReactElement, useMemo } from "react";
import { MatchDetailResponse } from "@/entities/fc-database/types";
import {
  convertMatchInfo,
  convertPlayers,
  covertMatchStatus,
  getBestPlayerActionShoot,
  getScorePanel,
} from "@/entities/match/lib/getMatchInfo";
import { MatchQueries } from "@/entities/match/model/queries";
import {
  MatchSummaryType,
  ScorePanelType,
} from "@/entities/match/types/match.info.types";
import { UserProfileFetcher } from "@/features/profile/ui/UserProfileFetcher";
import { BallSpinner } from "@/shared/ui/spinner/BallSpinner";
import MatchSummary from "@/features/match/ui/MatchSummary";
import { useInfiniteQuery } from "@tanstack/react-query";

interface MatchListProps {
  ouid: string;
  nickName: string;
}

const Loading = (): ReactElement => {
  return (
    <div className="w-full flex justify-center items-center my-5 h-[48px]">
      <BallSpinner />
    </div>
  );
};

export const MatchList = ({ ouid, nickName }: MatchListProps): ReactElement => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(MatchQueries.getMatchList({ ouid }));

  const summaries = useMemo<MatchSummaryType[]>(() => {
    if (!data) return [];
    return data.pages.flatMap((page) =>
      page.map((match: MatchDetailResponse) => {
        const { matchInfo } = match;
        const sortedMatchInfo = matchInfo.sort((a, b) => {
          return a.nickname === nickName ? -1 : b.nickname === nickName ? 1 : 0;
        });

        const info = convertMatchInfo(sortedMatchInfo);
        const status = covertMatchStatus(match);
        const players = convertPlayers(sortedMatchInfo);

        return {
          matchInfo: info,
          matchStatus: status,
          matchPlayers: players,
          matches: match,
        };
      })
    );
  }, [data]);

  const bestPlayer = useMemo(() => {
    return getBestPlayerActionShoot(
      summaries?.map((match) => match.matchPlayers).flat() || []
    );
  }, [summaries]);

  const scorePanel = useMemo<ScorePanelType>(() => {
    const matches = summaries?.map((match: MatchSummaryType) => match.matches);
    const matchInfo = matches
      ?.map((match) => match.matchInfo[0])
      .filter((info): info is NonNullable<typeof info> => info !== undefined);
    return getScorePanel(matchInfo);
  }, [summaries]);

  return (
    <div className="w-full min-w-[366px] flex flex-col min-h-screen pt-[50px]">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <UserProfileFetcher
            ouid={ouid}
            scorePanel={scorePanel}
            bestPlayer={bestPlayer}
            updatedAt={new Date()}
          />
          <div className="w-full flex flex-col justify-center items-center gap-4">
            {summaries?.map((match: MatchSummaryType, index: number) => (
              <div
                key={`${index}_match_list`}
                className="w-full flex justify-center items-center"
              >
                <MatchSummary match={match} />
              </div>
            ))}
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
