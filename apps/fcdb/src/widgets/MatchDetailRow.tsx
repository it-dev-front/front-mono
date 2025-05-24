import PlayerCard from "@/entities/player/ui/PlayerCard";
import { MatchStatusCard } from "@/entities/match/ui/MatchStatusCard";
import PossessionIndicator from "@/entities/match/ui/PossessionIndicator";
import ScoreCard from "@/entities/match/ui/ScoreCard";
import Image from "next/image";

const MatchDetailRow = () => {
  // TODO: 모바일 고려
  // TODO: 코드정리
  // TODO: 동적데이터로 변경

  return (
    <div className="flex w-full max-w-[1080px] rounded-[8px] bg-gray-900 border-1 border-gray-800 overflow-hidden">
      <div className="w-[8px] bg-primary-300" />

      <div className="flex-col w-full">
        <div className="flex justify-between items-center h-[165px] not-first:border-2 border-red-500">
          <MatchStatusCard
            matchType={50}
            matchResult="승"
            matchDate={new Date()}
          />
          <PlayerCard />
          <ScoreCard userScore={4} opponentScore={2} />
          <PlayerCard />

          <div className="flex justify-center items-center w-[48px] h-[133px] border-l-2 border-gray-600 cursor-pointer">
            <Image src="/polygon.svg" alt="arrow" width={16} height={11} />
          </div>
        </div>
        <PossessionIndicator
          userPossession={90}
          opponentPossession={10}
          userNickName="유저1"
          opponentNickName="유저2"
        />
      </div>
    </div>
  );
};

export default MatchDetailRow;
