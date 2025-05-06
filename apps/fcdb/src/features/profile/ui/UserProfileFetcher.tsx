"use client";

import { useQueries } from "@tanstack/react-query";
import { ProfileSummary } from "./ProfileSummary";
import { ProfileQueries } from "@/entities/profile/model/queries";

//TODO ouid 추출
const MOCK_OUID = "6d92bf89ca76f233a7ce750b5a24cad5";

export const UserProfileFetcher = () => {
  const results = useQueries({
    queries: [
      ProfileQueries.getUserProfile(MOCK_OUID),
      ProfileQueries.getUserBestRating(MOCK_OUID),
    ],
  });

  const [profileQuery, ratingQuery] = results;

  const isLoading = results.some((query) => query.isLoading);
  const isDataReady = results.every((query) => query.data);

  // TODO 로딩 스피너
  if (isLoading || !isDataReady) return <div>로딩 중...</div>;

  return (
    <ProfileSummary
      profileData={profileQuery.data!}
      ratingData={ratingQuery.data!}
    />
  );
};
