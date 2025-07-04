import { PlayerType } from "@/entities/match/types/match.types";
import { MetaQueries } from "@/entities/meta/model/queries";
import Badge from "@/entities/player/ui/Badge";
import { getPlayerImageSrc } from "@/features/user-search/ui/UserSearchFormationHalfCoat";
import { POSITION } from "@/shared/constant/position";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";

// TODO: 컴포넌트 분리, SRP에 맞게 분리
// 포지션: spposition:number -> desc:string 교환`
// 선수정보 : spId
// 이미지 spid 뒷6자리

// "id": 100000051,
// "name": "앨런 시어러"
// 이미지: spid 뒷 6자리
// 시즌: seasonId 앞 3자리
const isUser = true;

interface PlayerCardProps {
  bestPlayer: (PlayerType & { total: number }) | null;
}

const PlayerCard = ({ bestPlayer }: PlayerCardProps) => {
  const { data: soccerPlayerMeta } = useQuery(MetaQueries.getPlayerMeta());

  if (!bestPlayer) {
    return null;
  }

  const { spId, spPosition, spGrade } = bestPlayer;
  const seasonId = Number(spId.toString().slice(0, 3));
  const playerName = soccerPlayerMeta?.find(
    (player) => player.id === spId
  )?.name;

  const imageOverlayBaseStyle =
    "relative w-[72px] h-[72px] rounded-full border-[2px] bg-gray-900 mx-auto overflow-hidden";
  const opponentImageOverlayStyle = clsx(
    imageOverlayBaseStyle,
    "border-gray-600"
  );
  const userImageOverlayStyle = clsx(imageOverlayBaseStyle, "border-[#ABEE02]");

  return (
    <figure className="flex flex-col justify-between w-[124px] h-[117px] mobile:w-[80px] mobile:h-[88px]">
      <section className="relative h-[93px]">
        <Badge.Mvp isMvp />
        <div
          className={isUser ? userImageOverlayStyle : opponentImageOverlayStyle}
        >
          <Image
            src={getPlayerImageSrc(spId)}
            alt={playerName ? playerName : "선수 이미지"}
            fill
            className="object-cover"
          />
        </div>
        {/* 하단 뱃지 */}
        <div className="absolute w-full bottom-0 flex justify-center gap-[8px] z-1">
          <Badge.Season seasonId={seasonId} />
          <Badge.Grade spGrade={spGrade} />
        </div>
      </section>

      <section className="flex gap-[4px] text-[14px] whitespace-nowrap mobile:pt-[6px]">
        <span className="text-[#CE535D]">
          {POSITION[spPosition as keyof typeof POSITION]}
        </span>

        <span className="text-color-white">{playerName}</span>
      </section>
    </figure>
  );
};

export default PlayerCard;
