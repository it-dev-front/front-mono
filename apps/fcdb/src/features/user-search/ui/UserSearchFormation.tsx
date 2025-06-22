import { PositionIndicator } from "@/entities/formation/ui/PositionIndicator";
import { UserSearchFormationHalfCoat } from "@/features/user-search/ui/UserSearchFormationHalfCoat";
import { PlayerType } from "@/entities/match/types/match.types";

interface UserSearchFormationProps {
  matchPlayers: Array<{
    players: Record<string, PlayerType>;
    bestPlayer: PlayerType & { total: number };
  }>;
}

export const UserSearchFormation = ({
  matchPlayers,
}: UserSearchFormationProps) => {
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
      <p className="text-center text-[20px] pt-[16px] pb-[14px]">스쿼드 정보</p>

      <div className="flex gap-[24px] px-[20px]">
        <PositionIndicator color="#CE535D" label="FW" />

        <PositionIndicator color="#79CD8C" label="MF" />

        <PositionIndicator color="#507EED" label="DF" />

        <PositionIndicator color="#E67E22" label="GK" />
      </div>

      <div className="pt-[12px] px-[16px]">
        <div
          className="relative w-full h-0 pb-[60%] bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/soccer_coat.png')",
          }}
        >
          <div className="absolute inset-0 flex">
            {firstUserFormation && (
              <UserSearchFormationHalfCoat
                formation={firstUserFormation}
                formationGroup="first"
              />
            )}

            {secondUserFormation && (
              <UserSearchFormationHalfCoat
                formation={secondUserFormation}
                formationGroup="second"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
