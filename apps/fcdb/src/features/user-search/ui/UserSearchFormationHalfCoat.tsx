import Image from "next/image";
import { POSITION_LOCATIONS } from "@/shared/constant/position";
import { useQuery } from "@tanstack/react-query";
import { MetaQueries } from "@/entities/meta/model/queries";
import SafeImage from "@/shared/components/SafeImage";
import { getPositionColor, findPositionCategory } from "@/shared/lib/position";
import { PlayerType } from "@/entities/match/types/match.types";
import { Goal } from "@/entities/formation/ui/Goal";
import { playerActionImageSource } from "@/entities/player/lib";

export const getGradeBgColor = (grade: number) => {
  if (grade > 4 && grade < 8) return "#CBCED5";
  if (grade > 7) return "#FFEB34";

  return "#BC7350";
};

export const getGradeTextColor = (grade: number) => {
  if (grade < 5) {
    return "#FFFFFF";
  }

  return "#000000";
};

export const UserSearchFormationHalfCoat = ({
  formation,
  formationGroup,
}: {
  formation: {
    [key: string]: PlayerType;
  };
  formationGroup: "first" | "second";
}) => {
  const { data: soccerPlayerMeta } = useQuery(MetaQueries.getPlayerMeta());
  const { data: seasonIdMeta } = useQuery(MetaQueries.getSeasonIdMeta());

  const positionsEntries = Object.entries(POSITION_LOCATIONS);
  const positionsList =
    formationGroup === "first"
      ? positionsEntries
      : [...positionsEntries].reverse();

  return (
    // 확인 후 pb-[44px] 제거 필요
    <div className="w-1/2 h-full grid grid-cols-9 grid-rows-5 gap-1 px-[20px] pb-[44px] pt-[20px]">
      {positionsList.map(([key, positions], columnIndex) =>
        positions.map((position, rowIndex) => {
          const soccerPlayer = formation?.[position];

          if (!soccerPlayer) {
            return null;
          }

          const playerName = soccerPlayerMeta?.find(
            (player) => player.id === soccerPlayer.spId
          )?.name;
          const grade = soccerPlayer.spGrade;
          const seasonId = Number(soccerPlayer.spId.toString().slice(0, 3));
          const seasonImg = seasonIdMeta?.find(
            (element) => element.seasonId == seasonId
          )?.seasonImg;
          const positionCategory = findPositionCategory(
            soccerPlayer.spPosition as string
          );
          const positionColor = getPositionColor(positionCategory);
          const gradeBgColor = getGradeBgColor(grade);
          const gradeTextColor = getGradeTextColor(grade);
          const goal = soccerPlayer.status.goal;

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
                <Goal goal={goal} />
                <SafeImage
                  src={playerActionImageSource(soccerPlayer.spId)}
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
                      <div
                        className="border-[1px] border-[#ABEE02] h-[20px] w-[20px] flex items-center justify-center rounded-[4px]"
                        style={{ backgroundColor: gradeBgColor }}
                      >
                        <p
                          className="font-semibold text-[10px]"
                          style={{ color: gradeTextColor }}
                        >
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
            </div>
          );
        })
      )}
    </div>
  );
};
