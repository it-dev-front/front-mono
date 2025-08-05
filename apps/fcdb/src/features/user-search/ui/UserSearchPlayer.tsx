import { Goal } from "@/entities/formation/ui/Goal";
import PlayerImage from "@/shared/components/PlayerImage";
import Image from "next/image";
import { PlayerType } from "@/entities/match/types/match.types";
import { getPositionColor, findPositionCategory } from "@/shared/lib/position";

interface UserSearchPlayerProps {
  soccerPlayer: PlayerType;
  soccerPlayerMeta: { id: number; name: string }[];
  seasonIdMeta: { seasonId: number; className: string; seasonImg: string }[];
  gradeBgColor: string;
  gradeTextColor: string;
}

export const UserSearchPlayer = ({
  soccerPlayer,
  soccerPlayerMeta,
  seasonIdMeta,
  gradeBgColor,
  gradeTextColor,
}: UserSearchPlayerProps) => {
  const goal = soccerPlayer.status.goal;
  const playerName = soccerPlayerMeta?.find(
    (player) => player.id === soccerPlayer.spId
  )?.name;
  const seasonId = Number(soccerPlayer.spId.toString().slice(0, 3));
  const seasonImg = seasonIdMeta?.find(
    (element) => element.seasonId == seasonId
  )?.seasonImg;
  const grade = soccerPlayer.spGrade;
  const positionCategory = findPositionCategory(
    soccerPlayer.spPosition as string
  );
  const positionColor = getPositionColor(positionCategory);

  return (
    <div className="relative w-[50px] h-[60px] flex items-center justify-center">
      <Goal goal={goal} />
      <PlayerImage
        spId={soccerPlayer.spId}
        alt={playerName ? playerName : "선수 이미지"}
        width={50}
        height={60}
        className="rounded-full border-[1px] border-[#ABEE02]"
      />
      {seasonImg && (
        <div className="absolute left-0 -bottom-[20px] w-full">
          <div className="flex justify-between w-full items-center">
            <Image
              unoptimized
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
  );
};
