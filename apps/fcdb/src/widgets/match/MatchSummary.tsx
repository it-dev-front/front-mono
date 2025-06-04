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

// TODO: 동적 데이터 바인딩

const MatchSummary = () => {
  const MOCK_USER_POSSESSION = 90;
  const MOCK_OPPONENT_POSSESSION = 10;
  const MOCK_USER_NICKNAME = "유저유저";
  const MOCK_OPPONENT_NICKNAME = "상대상대";

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
              <MatchResultLabel matchResult="패" />
              <ScoreCard userScore={4} opponentScore={2} />
              <MatchDateLabel matchDate={new Date()} />
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
          userPossession={MOCK_USER_POSSESSION}
          opponentPossession={MOCK_OPPONENT_POSSESSION}
          userNickName={MOCK_USER_NICKNAME}
          opponentNickName={MOCK_OPPONENT_NICKNAME}
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
