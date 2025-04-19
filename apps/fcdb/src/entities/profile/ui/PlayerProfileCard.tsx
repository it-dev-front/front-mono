import { ReactElement } from "react";
import styles from "./PlayerProfileCard.module.css";
import Image from "next/image";

interface PlayerProfileCardProps {
  spId: number;
};

const playerActionImageSource = (spId: number): string => {
  // 선수 일반 이미지 경로
  // `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${spId}.png`;
  return `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`;
};

/**
 * @description 선수 기준
 * 최근 매치 리스트에서 득점을 제일 많이 한 선수
 */
export const PlayerProfileCard = ({
  spId,
}: PlayerProfileCardProps): ReactElement => {
  const imageSource = playerActionImageSource(spId);
  return (
    <div className={styles["profile-card"]}>
      <Image
        className="absolute bottom-[6px]"
        src={imageSource}
        alt={`${spId}_action_image`}
        width={140}
        height={160}
      />
    </div>
  );
};
