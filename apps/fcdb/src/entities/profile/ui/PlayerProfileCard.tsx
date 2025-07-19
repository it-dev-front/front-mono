import { ReactElement } from "react";
import styles from "./PlayerProfileCard.module.css";
import PlayerImage from "@/shared/components/PlayerImage";

interface PlayerProfileCardProps {
  spId: number;
}

/**
 * @description 선수 기준
 * 최근 매치 리스트에서 득점을 제일 많이 한 선수
 */
export const PlayerProfileCard = ({
  spId,
}: PlayerProfileCardProps): ReactElement => {
  return (
    <div className={styles["profile-card"]}>
      {spId && (
        <PlayerImage
          spId={spId}
          alt={`${spId}_action_image`}
          width={140}
          height={160}
        />
      )}
    </div>
  );
};
