import { PositionIndicator } from "@/entities/formation/ui/PositionIndicator";
import { UserSearchFormationHalfCoatMoblie } from "@/features/user-search/ui/UserSearchFormationHalfCoatMoblie";
import { PlayerType } from "@/entities/match/types/match.types";

interface UserSearchFormationMoblieProps {
  matchPlayers: Array<{
    players: Record<string, PlayerType>;
    bestPlayer: PlayerType & { total: number };
  }>;
}

export const UserSearchFormationMoblie = ({
  matchPlayers,
}: UserSearchFormationMoblieProps) => {
  const getPlayers = (idx: 0 | 1) => {
    if (!matchPlayers || !matchPlayers[idx]) {
      return {};
    }

    return matchPlayers[idx]?.players;
  };

  const getPlayersBySpPositon = (idx: 0 | 1) => {
    const players = getPlayers(idx);

    if (!players) {
      return;
    }

    return players;
  };

  const firstUserFormation = getPlayersBySpPositon(0);
  const secondUserFormation = getPlayersBySpPositon(1);

  return (
    <div>
      <p className="text-center text-[18px] pt-[20px] pb-[8px] lg:pt-[16px] lg:text-[20px] lg:pb-[14px]">
        스쿼드 정보
      </p>

      <div className="flex gap-[12px] px-[20px] lg:gap-[24px]">
        <PositionIndicator color="#CE535D" label="FW" />
        <PositionIndicator color="#79CD8C" label="MF" />
        <PositionIndicator color="#507EED" label="DF" />
        <PositionIndicator color="#E67E22" label="GK" />
      </div>

      <div className="pt-[10px] px-[8px] lg:pt-[12px] lg:px-[16px]">
        <div className="relative w-full h-[1200px] bg-[url('/images/soccer_coat_mobile.png')] bg-[length:100%_100%]">
          <div className="absolute flex-col w-full h-full">
            {firstUserFormation && (
              <div className="h-1/2 w-full">
                <UserSearchFormationHalfCoatMoblie
                  formation={firstUserFormation}
                  formationGroup="first"
                />
              </div>
            )}

            {secondUserFormation && (
              <div className="h-1/2 w-full ">
                <UserSearchFormationHalfCoatMoblie
                  formation={secondUserFormation}
                  formationGroup="second"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
