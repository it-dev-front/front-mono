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
import { ButtonSpinner } from "@/shared/ui/spinner/ButtonSpinner";
import { useInfiniteMatchSummaries } from "../hooks/useInfiniteMatchSummaries";

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
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {infiniteSummaries?.map((match: MatchSummaryType, index: number) => (
          <div
            key={`${index}_match_list`}
            className="w-full flex justify-center items-center"
          >
            <MatchSummary match={match} />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center my-5">
        <button
          type="button"
          className={`bg-primary-300 text-white px-4 py-2 rounded-md w-[244px] h-[48px] ${
            loading
              ? "bg-primary-100 opacity-80 cursor-default"
              : "cursor-pointer"
          }`}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || loading}
        >
          {loading ? <ButtonSpinner /> : "더 보기"}
        </button>
      </div>
    </div>
  );
};
