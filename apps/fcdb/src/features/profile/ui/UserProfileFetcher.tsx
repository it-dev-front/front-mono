"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { ProfileSummary } from "./ProfileSummary";
import { ProfileQueries } from "@/entities/profile/model/queries";
import {
  MatchSummaryType,
  ScorePanelType,
} from "@/entities/match/types/match.info.types";
import { MATH_QUERY_KEY } from "@/entities/match/model/keys/queryKeys";
import { getMatchIds, getMatchList } from "@/entities/match/model/api";
import { useMemo } from "react";
import {
  convertMatchInfo,
  convertPlayers,
  covertMatchStatus,
  getBestPlayerActionShoot,
  getScorePanel,
} from "@/entities/match/lib/getMatchInfo";

interface UserProfileFetcherProps {
  ouid: string;
  updatedAt: Date;
}

export const UserProfileFetcher = ({
  ouid,
  updatedAt,
}: UserProfileFetcherProps) => {
  const { data: matchIds, isLoading: isInitialLoading } = useQuery({
    queryKey: [MATH_QUERY_KEY.PROFILE, ouid, MATH_QUERY_KEY.PROFILE],
    queryFn: () => getMatchIds(ouid, 1, 20),
  });
  const results = useQueries({
    queries: [
      ProfileQueries.getUserProfile(ouid),
      ProfileQueries.getUserBestRating(ouid),
      {
        queryKey: [MATH_QUERY_KEY.DETAIL, ouid],
        queryFn: () => getMatchList(matchIds ?? []),
        enabled: !!matchIds,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
      },
    ],
  });

  const [profileQuery, ratingQuery, initialMatches] = results;
  const isLoading = results.some((query) => query.isLoading);
  const isDataReady = results.every((query) => query.data);

  const initialSummaries = useMemo(() => {
    if (!initialMatches.data) return [];

    return initialMatches.data.map((match) => {
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
    });
  }, [initialMatches.data]);

  const bestPlayer = useMemo(() => {
    return getBestPlayerActionShoot(
      initialSummaries?.map((match) => match.matchPlayers).flat() || []
    );
  }, [initialSummaries]);

  const scorePanel = useMemo<ScorePanelType>(() => {
    const matches = initialSummaries?.map(
      (match: MatchSummaryType) => match.matches
    );
    const matchInfo = matches
      ?.map((match) => match.matchInfo[0])
      .filter((info): info is NonNullable<typeof info> => info !== undefined);
    return getScorePanel(matchInfo);
  }, [initialSummaries]);

  const loading = isLoading || !isDataReady || isInitialLoading;

  return (
    <>
      <ProfileSummary
        profileData={profileQuery.data!}
        ratingData={ratingQuery.data!}
        scorePanel={scorePanel}
        bestPlayer={bestPlayer}
        updatedAt={updatedAt}
        isLoading={loading}
      />
    </>
  );
};
