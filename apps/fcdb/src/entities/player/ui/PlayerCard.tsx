import { memo, useMemo } from "react";

import Badge from "@/entities/player/ui/Badge";
import { MetaQueries } from "@/entities/meta/model/queries";
import { POSITION } from "@/shared/constant/position";
import PlayerImage from "@/shared/components/PlayerImage";
import { PlayerType } from "@/entities/match/types/match.types";
import clsx from "clsx";
import { playerActionImageSource } from "../lib";
import { useQuery } from "@tanstack/react-query";

// TODO: 컴포넌트 분리, SRP에 맞게 분리
// 포지션: spposition:number -> desc:string 교환`
// 선수정보 : spId
// 이미지 spid 뒷6자리

// "id": 100000051,
// "name": "앨런 시어러"
// 이미지: spid 뒷 6자리
// 시즌: seasonId 앞 3자리

interface PlayerCardProps {
  bestPlayer: (PlayerType & { total: number }) | null;
  isUser?: boolean;
}

const PlayerCard = ({ bestPlayer, isUser = true }: PlayerCardProps) => {
  const { data: soccerPlayerMeta } = useQuery(MetaQueries.getPlayerMeta());

  const { spPosition, spGrade } = bestPlayer ?? {};

  const playerImageSrc = useMemo(() => {
    return bestPlayer ? playerActionImageSource(bestPlayer.spId) : "";
  }, [bestPlayer]);

  const seasonId = useMemo(() => {
    return bestPlayer ? Number(bestPlayer.spId.toString().slice(0, 3)) : null;
  }, [bestPlayer]);

  const playerName = useMemo(() => {
    if (!bestPlayer || !soccerPlayerMeta) return "";
    const found = soccerPlayerMeta.find(
      (player) => player.id === bestPlayer.spId
    );
    return found?.name || "";
  }, [bestPlayer, soccerPlayerMeta]);

  if (!bestPlayer) {
    return <div className="w-[124px] block" />;
  }

  const imageOverlayBaseStyle =
    "relative w-[72px] h-[72px] mobile:w-[62px] mobile:h-[62px] rounded-full border-[2px] bg-gray-900 mx-auto overflow-hidden";
  const opponentImageOverlayStyle = clsx(
    imageOverlayBaseStyle,
    "border-gray-600"
  );
  const userImageOverlayStyle = clsx(imageOverlayBaseStyle, "border-[#ABEE02]");

  return (
    <figure className="flex flex-col justify-between w-[124px] h-[117px] mobile:w-[80px] mobile:h-[88px] items-center">
      <section className="relative h-[93px]">
        <Badge.Mvp isMvp={isUser} />
        <div
          className={isUser ? userImageOverlayStyle : opponentImageOverlayStyle}
        >
          <PlayerImage
            spId={bestPlayer.spId}
            alt={playerName || "선수 이미지"}
            width={72}
            height={72}
            className="object-cover"
          />
        </div>
        <div className="absolute w-full bottom-0 flex justify-center gap-[8px] z-1">
          {seasonId && <Badge.Season seasonId={seasonId} />}
          <Badge.Grade spGrade={spGrade ?? 0} />
        </div>
      </section>

      <section className="flex gap-[4px] text-[14px] whitespace-nowrap mobile:pt-[6px]">
        <span className="text-[#CE535D] mobile:text-[10px]">
          {POSITION[spPosition as keyof typeof POSITION]}
        </span>
        <span className="text-color-white mobile:text-[10px]">
          {playerName}
        </span>
      </section>
    </figure>
  );
};

export default memo(PlayerCard);
