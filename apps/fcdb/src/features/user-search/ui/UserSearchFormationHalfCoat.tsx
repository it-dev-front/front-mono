import { POSITION_LOCATIONS } from "@/shared/constant/position";
import { useQuery } from "@tanstack/react-query";
import { MetaQueries } from "@/entities/meta/model/queries";
import { PlayerType } from "@/entities/match/types/match.types";
import { UserSearchPlayer } from "@/features/user-search/ui/UserSearchPlayer";

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

          const grade = soccerPlayer.spGrade;
          const gradeBgColor = getGradeBgColor(grade);
          const gradeTextColor = getGradeTextColor(grade);

          return (
            <div
              key={position}
              className={`w-full h-full flex flex-col items-center justify-center`}
              style={{
                gridColumn: columnIndex + 1,
                gridRow: rowIndex + 1,
              }}
            >
              <UserSearchPlayer
                soccerPlayer={soccerPlayer}
                soccerPlayerMeta={soccerPlayerMeta ?? []}
                gradeBgColor={gradeBgColor}
                gradeTextColor={gradeTextColor}
                seasonIdMeta={seasonIdMeta ?? []}
              />
            </div>
          );
        })
      )}
    </div>
  );
};
