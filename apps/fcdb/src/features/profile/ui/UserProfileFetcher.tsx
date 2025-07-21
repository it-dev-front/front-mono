"use client";

import { ProfileSummary } from "./ProfileSummary";
import {
  MatchSummaryType,
  ScorePanelType,
} from "@/entities/match/types/match.info.types";
import { useMemo } from "react";
import {
  getBestPlayerActionShoot,
  getScorePanel,
} from "@/entities/match/lib/getMatchInfo";
import {
  BestGradeResponse,
  UserProfileResponse,
} from "@/entities/fc-database/types";

interface UserProfileFetcherProps {
  updatedAt: Date;
  profileInfo: UserProfileResponse;
  bestRating: BestGradeResponse;
  initialSummaries: MatchSummaryType[];
  isLoading?: boolean;
}

export const UserProfileFetcher = ({
  updatedAt,
  profileInfo,
  bestRating,
  initialSummaries,
  isLoading = false,
}: UserProfileFetcherProps) => {
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

  return (
    <ProfileSummary
      profileData={profileInfo}
      ratingData={bestRating}
      scorePanel={scorePanel}
      bestPlayer={bestPlayer}
      updatedAt={updatedAt}
      isLoading={isLoading}
    />
  );
};
