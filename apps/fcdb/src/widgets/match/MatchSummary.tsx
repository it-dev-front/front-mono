"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import PlayerCard from "@/entities/player/ui/PlayerCard";
import MatchSummaryHeader from "@/widgets/match/MatchSummaryHeader";
import PossessionIndicator from "@/entities/match/ui/PossessionIndicator";
import ScoreCard from "@/entities/match/ui/ScoreBoard";
import MatchResultLabel from "@/entities/match/ui/MatchResultLabel";
import MatchDateLabel from "@/entities/match/ui/MatchDateLabel";
import { UserSearchFormation } from "@/features/user-search/ui/UserSearchFormation";
import { ConvertedMatchInfo } from "@/entities/match/lib/getMatchInfo";

interface MatchSummaryProps {
  match: ConvertedMatchInfo;
}

const MatchSummary = ({ match }: MatchSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="flex w-full max-w-[1080px] rounded-[8px] bg-gray-900 border border-gray-800 overflow-hidden mobile:rounded-none">
      <aside className="w-2 mobile:w-1 bg-primary-300" aria-hidden="true" />

      <section className="flex flex-col w-full">
        <header className="flex justify-between items-center h-[165px] mobile:h-[98px]">
          <MatchSummaryHeader />

          <div className="flex items-center gap-[34.5px] mx-auto">
            <PlayerCard />

            <div className="flex flex-col items-center justify-center gap-2 [&>*:not(:nth-child(2))]:hidden mobile:[&>*:not(:nth-child(2))]:block">
              <MatchResultLabel matchResult={match.matchResult} />
              <ScoreCard
                userScore={match.score.userScore}
                opponentScore={match.score.opponentScore}
              />
              <MatchDateLabel matchDate={match.matchDate} />
            </div>

            <PlayerCard />
          </div>

          <button
            type="button"
            aria-expanded={isExpanded}
            className="flex justify-center items-center w-[48px] h-[133px] mobile:w-[30px] mobile:h-[82px] border-l-2 border-gray-600 cursor-pointer"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <Image
              src="/arrow-green.svg"
              alt="접기/펼치기"
              width={16}
              height={11}
              className={clsx(
                "w-[16px] h-[11px] mobile:w-[12px] mobile:h-[8px]",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        </header>

        <PossessionIndicator
          userNickName={match.indicator.userNickName}
          userPossession={match.indicator.userPossession}
          opponentNickName={match.indicator.opponentNickName}
          opponentPossession={match.indicator.opponentPossession}
        />

        <div
          className={clsx(
            "overflow-hidden transition-[height] duration-300 ease-in-out",
            isExpanded ? "h-[814px] mobile:h-[1014px]" : "h-0"
          )}
        >
          {/* Accordion content */}
          <UserSearchFormation />
        </div>
      </section>
    </article>
  );
};

export default MatchSummary;
