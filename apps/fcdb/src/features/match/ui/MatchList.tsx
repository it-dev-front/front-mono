"use client";

import { ReactElement } from "react";
import { MatchSummaryType } from "@/entities/match/types/match.info.types";
import { UserProfileFetcher } from "@/features/profile/ui/UserProfileFetcher";
import MatchSummary from "@/features/match/ui/MatchSummary";
import {
  BestGradeResponse,
  MatchDetailResponse,
  UserProfileResponse,
} from "@/entities/fc-database/types";
import { useInfiniteMatchSummaries } from "../hooks/useInfiniteMatchSummaries";
import { ShowMoreButton } from "@/shared/ui/button/ShowMoreButton";

interface MatchListProps {
  ouid: string;
  matchList: MatchDetailResponse[];
  profileInfo: UserProfileResponse;
  bestRating: BestGradeResponse;
}

export const MatchList = ({
  ouid,
  matchList,
  profileInfo,
  bestRating,
}: MatchListProps): ReactElement => {
  const {
    infiniteSummaries,
    initialData,
    fetchNextPage,
    hasNextPage,
    loading,
  } = useInfiniteMatchSummaries(ouid, matchList, profileInfo);

  return (
    <div className="w-full min-w-[366px] flex flex-col min-h-screen pt-[50px]">
      <UserProfileFetcher
        updatedAt={new Date()}
        profileInfo={profileInfo}
        bestRating={bestRating}
        initialSummaries={initialData}
        isLoading={loading}
      />
      <div className="w-full flex flex-col justify-center items-center gap-[8px] mobile:gap-[10px]">
        {infiniteSummaries?.map((match: MatchSummaryType, index: number) => (
          <div
            key={`${index}_match_list`}
            className="w-full flex justify-center items-center"
          >
            <MatchSummary match={match} />
          </div>
        ))}
        <div className="w-full flex justify-center items-center mt-[8px] mobile:mt-[6px] mb-[16px] mobile:mb-[12px]">
          <div className="w-full max-w-[1080px]">
            <ShowMoreButton
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || loading}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
