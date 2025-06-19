"use client";

import MatchSummary from "@/widgets/match/MatchSummary";
import { Fragment } from "react";
import { useMatchFetcher } from "@/features/match/providers/MatchProvider";
import { MatchSummaryType } from "@/entities/match/types/match.info.types";

export const MatchSummaryFetcher = () => {
  const { matches, isMatchesLoading } = useMatchFetcher();

  if (isMatchesLoading) return <div>...loading</div>;
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
