"use client";

import { useQueries } from "@tanstack/react-query";
import { ProfileSummary } from "./ProfileSummary";
import { ProfileQueries } from "@/entities/profile/model/queries";
import { useMatchFetcher } from "@/entities/match/providers/MatchProvider";

export const UserProfileFetcher = ({ ouid }: { ouid: string }) => {
  const results = useQueries({
    queries: [
      ProfileQueries.getUserProfile(ouid),
      ProfileQueries.getUserBestRating(ouid),
    ],
  });
  const { scorePanel, isMatchesLoading, bestPlayer } = useMatchFetcher();
  const [profileQuery, ratingQuery] = results;
  const isLoading = results.some((query) => query.isLoading);
  const isDataReady = results.every((query) => query.data);

  if (isLoading || !isDataReady || isMatchesLoading)
    return <div>로딩 중...</div>;

  return (
    <ProfileSummary
      profileData={profileQuery.data!}
      ratingData={ratingQuery.data!}
      scorePanel={scorePanel}
      bestPlayer={bestPlayer}
    />
  );
};
