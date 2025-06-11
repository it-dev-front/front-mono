"use client";

import MatchSummary from "@/widgets/match/MatchSummary";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { MatchQueries } from "@/entities/match/model/queries";
import { useQuery } from "@tanstack/react-query";
import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { convertMatchInfo } from "@/entities/match/lib/getMatchInfo";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchMatchDetails = async (matchIds: string[]) => {
  const matchApi = await FcClient.get("Match");
  const matchList = [];

  for (const matchId of matchIds) {
    const response = await matchApi.getMatchDetail(matchId);
    matchList.push(convertMatchInfo(response.matchInfo));
    await delay(10);
  }

  return matchList;
};

export const MatchSummaryFetcher = () => {
  const searchParams = useSearchParams();
  const ouid = searchParams.get("q") ?? "";

  const { data: matchIds, isLoading: isMatchIdsLoading } = useQuery(
    MatchQueries.getMatchIds(ouid, { limit: 10, offset: 0 })
  );

  const { data: matches, isLoading: isMatchesLoading } = useQuery({
    queryKey: ["matchDetails", matchIds],
    queryFn: () => (matchIds ? fetchMatchDetails(matchIds) : []),
    enabled: !!matchIds,
  });

  if (isMatchIdsLoading || isMatchesLoading) return <div>...loading</div>;
  if (!matches) return null;

  return (
    <>
      {matches.map((match, index) => (
        <Fragment key={`${index}_match_list`}>
          <MatchSummary match={match} />
        </Fragment>
      ))}
    </>
  );
};
