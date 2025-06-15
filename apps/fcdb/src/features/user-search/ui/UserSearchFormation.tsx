// 리펙토링 예정

import Image from "next/image";
import { PositionIndicator } from "@/entities/formation/ui/PositionIndicator";
import { POSITION, POSITION_LOCATIONS } from "@/shared/constant/position";
import { useQuery } from "@tanstack/react-query";
import { MetaQueries } from "@/entities/meta/model/queries";
import matchDetailMock from "@/shared/mocks/match-detail.json";
import SafeImage from "@/shared/components/SafeImage";
import { POSITION_CATEGORY } from "@/shared/constant/position";

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

console.log(POSITION_CATEGORY);

const positionsEntries = Object.entries(POSITION_LOCATIONS);

const FormationHalfCoat = ({
  formation,
  formationGroup,
}: {
  formation: any;
  formationGroup: "first" | "second";
}) => {
  const { data: soccerPlayerMeta } = useQuery(MetaQueries.getPlayerMeta());
  const { data: seasonIdMeta } = useQuery(MetaQueries.getSeasonIdMeta());

  const positionsList =
    formationGroup === "first"
      ? positionsEntries
      : [...positionsEntries].reverse();

  return (
    // 확인 후 pb-[24px] 제거 필요
    <div className="w-1/2 h-full grid grid-cols-9 grid-rows-5 gap-1 px-[12px] pb-[24px]">
      {positionsList.map(([key, positions], columnIndex) =>
        positions.map((position, rowIndex) => {
          const soccerPlayer = formation?.[position];

          if (!soccerPlayer) {
            return null;
          }

          const getPlayerImageSrc = () => {
            const imgSrc = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${soccerPlayer.spId}.png`;

            return imgSrc;
          };

          const playerName = soccerPlayerMeta?.find(
            (player) => player.id === soccerPlayer.spId
          )?.name;
          const grade = soccerPlayer.spGrade;
          const seasonId = soccerPlayer.spId.toString().slice(0, 3);
          const seasonImg = seasonIdMeta?.find(
            (element) => element.seasonId == seasonId
          )?.seasonImg;

          // console.log(soccerPlayer.spPosition);

          const findPositionCategory = (position: string) => {
            if (position === "GK") return "gk";
            if (POSITION_CATEGORY.fw.includes(position)) return "fw";
            if (POSITION_CATEGORY.mf.includes(position)) return "mf";
            if (POSITION_CATEGORY.df.includes(position)) return "df";
            return "";
          };

          const positionCategory = findPositionCategory(
            soccerPlayer.spPosition
          );

          const getPositionColor = (positionCategory: string) => {
            switch (positionCategory) {
              case "fw":
                return "#CE535D";
              case "mf":
                return "#79CD8C";
              case "df":
                return "#507EED";
              case "gk":
                return "#E67E22";
            }
          };

          const positionColor = getPositionColor(positionCategory);

          return (
            <div
              key={position}
              className={`w-full h-full flex flex-col items-center justify-center`}
              style={{
                gridColumn: columnIndex + 1,
                gridRow: rowIndex + 1,
              }}
            >
              <div className="relative w-[50px] h-[60px] flex items-center justify-center">
                <SafeImage
                  src={getPlayerImageSrc()}
                  alt={playerName ? playerName : "선수 이미지"}
                  width={50}
                  height={60}
                  className="rounded-full border-[1px] border-[#ABEE02]"
                />
                {seasonImg && (
                  <div className="absolute left-0 -bottom-[20px] w-full">
                    <div className="flex justify-between w-full items-center">
                      <Image
                        src={seasonImg}
                        alt="season-image"
                        width={26}
                        height={20}
                        className="rounded-[4px]"
                      />
                      <div className="border-[1px] border-[#ABEE02] h-[20px] w-[20px] flex items-center justify-center bg-[#212121] rounded-[4px]">
                        <p className="text-[#CE535D] font-semibold text-[10px]">
                          {grade}
                        </p>
                      </div>
                    </div>
                    <div className="w-[calc(100%+8px)] -mx-1 overflow-hidden">
                      <p
                        className="font-semibold text-[10px] text-center whitespace-nowrap overflow-hidden text-clip"
                        style={{ color: positionColor }}
                      >
                        {playerName}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-[10px] text-center" title={playerName}></div>
            </div>
          );
        })
      )}
    </div>
  );
};

export const UserSearchFormation = () => {
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
            <FormationHalfCoat
              formation={leftUserFormation}
              formationGroup="first"
            />
            <FormationHalfCoat
              formation={rightUserFormation}
              formationGroup="second"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
