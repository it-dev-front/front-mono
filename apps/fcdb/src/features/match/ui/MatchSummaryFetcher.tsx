"use client";

import MatchSummary from "@/widgets/match/MatchSummary";
import { Fragment } from "react";
import { useMatchFetcher } from "@/entities/match/providers/MatchProvider";
import { MatchSummaryType } from "@/entities/match/types/match.info.types";
import { BallSpinner } from "@/shared/ui/spinner/BallSpinner";

export const MatchSummaryFetcher = () => {
  const { matches, isMatchesLoading } = useMatchFetcher();

  if (isMatchesLoading)
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <BallSpinner />
      </div>
    );
  if (!matches) return null;

  return (
    <>
      {matches.map((match: MatchSummaryType, index: number) => (
        <Fragment key={`${index}_match_list`}>
          <MatchSummary match={match} />
        </Fragment>
      ))}
    </>
  );
};
