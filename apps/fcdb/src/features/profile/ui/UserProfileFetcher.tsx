"use client";

import { useQueries } from "@tanstack/react-query";
import { ProfileSummary } from "./ProfileSummary";
import { ProfileQueries } from "@/entities/profile/model/queries";
import { useSearchParams } from "next/navigation";
import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { useEffect } from "react";

export const UserProfileFetcher = () => {
  const searchParams = useSearchParams();
  const ouid = searchParams.get("q") ?? "";
  const test = async () => {
    const matchApi = await FcClient.get("Match");
    const data = await matchApi.getMatchDetail("68308ac10e1a47536f945e00");
    console.log(data);
  };
  useEffect(() => {
    test();
  }, []);

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
