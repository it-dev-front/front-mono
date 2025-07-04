import { PlayerType } from "@/entities/match/types/match.types";
import { UserSearchPlayer } from "@/features/user-search/ui/UserSearchPlayer";
import { MetaQueries } from "@/entities/meta/model/queries";
import { useQuery } from "@tanstack/react-query";
import {
  getGradeTextColor,
  getGradeBgColor,
} from "@/features/user-search/ui/UserSearchFormationHalfCoatMoblie";

interface UserSearchSubPlayersProps {
  matchPlayers: Array<{
    players: Record<string, PlayerType>;
    bestPlayer: PlayerType & { total: number };
    subPlayers: PlayerType[];
  }>;
}

export const UserSearchSubPlayers = ({
  matchPlayers,
}: UserSearchSubPlayersProps) => {
  const { data: soccerPlayerMeta } = useQuery(MetaQueries.getPlayerMeta());
  const { data: seasonIdMeta } = useQuery(MetaQueries.getSeasonIdMeta());
  // console.log("@@@ firstUserSubPlayer", matchPlayers[0]?.subPlayers);
  // console.log("@@@ secondUserSubPlayer", matchPlayers[1]?.subPlayers);

  return (
    <div className="w-full flex justify-center flex-col">
      <div className="flex justify-center pb-[20px]">
        <p className="text-[16px]">교체 선수</p>
      </div>
      <div>
        <div className="flex gap-[12px] px-[20px] lg:gap-[24px]">
          {matchPlayers[0]?.subPlayers.map((player) => (
            <UserSearchPlayer
              soccerPlayer={player}
              soccerPlayerMeta={soccerPlayerMeta ?? []}
              seasonIdMeta={seasonIdMeta ?? []}
              gradeBgColor={getGradeBgColor(player.spGrade)}
              gradeTextColor={getGradeTextColor(player.spGrade)}
              key={player.spId}
            />
          ))}
          {matchPlayers[1]?.subPlayers.map((player) => (
            <UserSearchPlayer
              soccerPlayer={player}
              soccerPlayerMeta={soccerPlayerMeta ?? []}
              seasonIdMeta={seasonIdMeta ?? []}
              gradeBgColor={getGradeBgColor(player.spGrade)}
              gradeTextColor={getGradeTextColor(player.spGrade)}
              key={player.spId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
