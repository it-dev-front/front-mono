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

export const UserSearchFormationHalfCoatMoblie = ({
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
    <div className="w-full h-full grid grid-cols-5 grid-rows-9 pb-[14px] px-[8px]">
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
                gridColumn: rowIndex + 1,
                gridRow: columnIndex + 1,
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Goal goal={goal} />
                <SafeImage
                  src={playerActionImageSource(soccerPlayer.spId)}
                  alt={playerName ? playerName : "선수 이미지"}
                  width={38}
                  height={38}
                  className="rounded-full border-[1px] border-[#ABEE02]"
                />
                {seasonImg && (
                  <div className="absolute left-0 -bottom-[8px] w-full">
                    <div className="flex justify-center gap-[4px] w-full items-center">
                      <Image
                        src={seasonImg}
                        alt="season-image"
                        width={20}
                        height={14}
                        className="rounded-[4px]"
                      />
                      <div
                        className="border-[1px] border-[#ABEE02] h-[14px] w-[14px] flex items-center justify-center rounded-[4px]"
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
