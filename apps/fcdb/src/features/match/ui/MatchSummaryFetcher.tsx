"use client";

import MatchSummary from "@/widgets/match/MatchSummary";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { MatchQueries } from "@/entities/match/model/queries";
import { useQuery } from "@tanstack/react-query";
import { FcClient } from "@/entities/fc-database/lib/FcClient";
import {
  convertMatchInfo,
  covertMatchStatus,
  conertPlayers,
} from "@/entities/match/lib/getMatchInfo";

const fetchMatchDetails = async (matchIds: string[]) => {
  const matchApi = await FcClient.get("Match");
  const matchDetailPromises = matchIds.map(async (matchId) => {
    const response = await matchApi.getMatchDetail(matchId);
    const matchStatus = covertMatchStatus(response);
    const matchInfo = convertMatchInfo(response.matchInfo);
    const matchPlayers = conertPlayers(response.matchInfo);

    return {
      matchInfo,
      matchStatus,
      matchPlayers,
    };
  });
  return Promise.all(matchDetailPromises);
};

export const MatchSummaryFetcher = () => {
  const searchParams = useSearchParams();
  const ouid = searchParams.get("q") ?? "";

  const { data: matchIds, isLoading: isMatchIdsLoading } = useQuery(
    MatchQueries.getMatchIds(ouid, { limit: 5, offset: 0 })
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
