import Badge from "@/entities/player-card/ui/Badge";
import clsx from "clsx";
import Image from "next/image";

// TODO: 컴포넌트 분리, SRP에 맞게 분리
// MOCK_DATA API교체
// TODO: 모바일 고려
interface PlayerCardProps {
  spId: string;
  spPosition: number;
  name: string;
  team: string;
}

// 포지션: spposition:number -> desc:string 교환`
// 선수정보 : spId
// 이미지 spid 뒷6자리

// "id": 100000051,
// "name": "앨런 시어러"
// 이미지: spid 뒷 6자리
// 시즌: seasonId 앞 3자리
const MOCK_POSITION_DESC = "FW";
const MOCK_PLAYER_NAME = "홍길동";
const MOCK_PLAYER_IMAGE =
  "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p100000051.png";
const isUser = true;

const PlayerCard = () => {
  const imageOverlayBaseStyle =
    "relative w-[72px] h-[72px] rounded-full border-[2px] bg-gray-900 mx-auto overflow-hidden";
  const opponentImageOverlayStyle = clsx(
    imageOverlayBaseStyle,
    "border-gray-600"
  );
  const userImageOverlayStyle = clsx(imageOverlayBaseStyle, "border-[#ABEE02]");

  return (
    <figure className="flex flex-col justify-between w-[124px] h-[117px] mobile:w-[80px] mobile:h-[82px]">
      <section className="relative h-[93px]">
        <Badge.Mvp isMvp />
        <div
          className={isUser ? userImageOverlayStyle : opponentImageOverlayStyle}
        >
          <Image
            src={MOCK_PLAYER_IMAGE}
            alt={MOCK_PLAYER_NAME}
            fill
            className="object-cover"
          />
        </div>

        {/* 하단 뱃지 */}
        <div className="absolute w-full bottom-0 flex justify-center gap-[8px] z-1">
          <Badge.Season seasonId={100} />
          <Badge.Grade spGrade={8} />
        </div>
      </section>

      <section className="flex gap-[4px] text-[14px] whitespace-nowrap">
        <span className="text-[#CE535D]">
          {/* TODO: object mapping */}
          {MOCK_POSITION_DESC}
        </span>

        <span className="text-color-white">
          {/* player name */}
          {MOCK_PLAYER_NAME}
        </span>
      </section>
    </figure>
  );
};

export default PlayerCard;
