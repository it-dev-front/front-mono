"use client";

import { useQueries } from "@tanstack/react-query";
import { ProfileSummary } from "./ProfileSummary";
import { ProfileQueries } from "@/entities/profile/model/queries";
import { ScorePanelType } from "@/entities/match/types/match.info.types";
import { PlayerType } from "@/entities/match/types/match.types";

interface UserProfileFetcherProps {
  ouid: string;
  scorePanel: ScorePanelType;
  bestPlayer: (PlayerType & { total: number }) | null;
  updatedAt: Date;
}

export const UserProfileFetcher = ({
  ouid,
  scorePanel,
  bestPlayer,
  updatedAt,
}: UserProfileFetcherProps) => {
  const results = useQueries({
    queries: [
      ProfileQueries.getUserProfile(ouid),
      ProfileQueries.getUserBestRating(ouid),
    ],
  });

  const [profileQuery, ratingQuery] = results;
  const isLoading = results.some((query) => query.isLoading);
  const isDataReady = results.every((query) => query.data);

  // TODO 스켈레톤
  if (isLoading || !isDataReady) return <div>로딩 중...</div>;

  return (
    <ProfileSummary
      profileData={profileQuery.data!}
      ratingData={ratingQuery.data!}
      scorePanel={scorePanel}
      bestPlayer={bestPlayer}
      updatedAt={updatedAt}
    />
  );
};
