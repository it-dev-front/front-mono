import { PositionIndicator } from "@/entities/formation/ui/PositionIndicator";
import { POSITION } from "@/shared/constant/position";
import matchDetailMock from "@/shared/mocks/match-detail.json";
import { UserSearchFormationHalfCoat } from "@/features/user-search/ui/UserSearchFormationHalfCoat";

export const UserSearchFormation = () => {
  const matchDetailData = matchDetailMock.matchInfo;

  const getPlayers = (idx: 0 | 1) => {
    return matchDetailData[idx]?.player.map((player) => ({
      ...player,
      ...{ spPosition: POSITION[player.spPosition as keyof typeof POSITION] },
    }));
  };
  const getPlayersBySpPositon = (idx: 0 | 1) => {
    const players = getPlayers(idx);

    if (!players) {
      return;
    }

    return players.reduce(
      (acc, cur) => ({ ...acc, ...{ [cur.spPosition]: cur } }),
      {}
    );
  };

  const leftUserFormation = getPlayersBySpPositon(0);
  const rightUserFormation = getPlayersBySpPositon(1);
  
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
            <UserSearchFormationHalfCoat
              formation={leftUserFormation}
              formationGroup="first"
            />
            <UserSearchFormationHalfCoat
              formation={rightUserFormation}
              formationGroup="second"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
