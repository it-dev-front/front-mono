"use client";

import { useQueries } from "@tanstack/react-query";
import { ProfileSummary } from "./ProfileSummary";
import { ProfileQueries } from "@/entities/profile/model/queries";
import { useSearchParams } from "next/navigation";

export const UserProfileFetcher = () => {
  const searchParams = useSearchParams();
  const ouid = searchParams.get("q") ?? "";

  const results = useQueries({
    queries: [
      ProfileQueries.getUserProfile(ouid),
      ProfileQueries.getUserBestRating(ouid),
    ],
  });

  const [profileQuery, ratingQuery] = results;
  const isLoading = results.some((query) => query.isLoading);
  const isDataReady = results.every((query) => query.data);

  if (isLoading || !isDataReady) return <div>로딩 중...</div>;

  return (
    <ProfileSummary
      profileData={profileQuery.data!}
      ratingData={ratingQuery.data!}
    />
  );
};
