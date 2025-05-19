import clsx from "clsx";
import { MIN_WIDTH } from "../constants";

interface PossessionIndicatorProps {
  userPossession: number;
  opponentPossession: number;
  userNickName: string;
  opponentNickName: string;
}

const PossessionIndicator = ({
  userPossession,
  opponentPossession,
  userNickName,
  opponentNickName,
}: PossessionIndicatorProps) => {
  const sectionBaseStyle =
    "flex items-center justify-between gap-[30px] px-[24px] mobile:px-[16px]";
  const userSectionStyle = clsx(sectionBaseStyle, "bg-gray-800");
  const opponentSectionStyle = clsx(sectionBaseStyle, "bg-gray-700");

  const calculatePossessionWidth = (possession: number): string => {
    return `${Math.max(possession, MIN_WIDTH)}%`;
  };

  return (
    <figure className="flex w-full h-[36px] mobile:h-[20px] text-[20px] mobile:text-[10px] font-bold">
      <section
        className={userSectionStyle}
        style={{
          width: calculatePossessionWidth(userPossession),
        }}
      >
        <span className="truncate whitespace-nowrap">{userNickName}</span>
        <span className="mobile:hidden">{userPossession}%</span>
      </section>

      <section
        className={opponentSectionStyle}
        style={{
          width: calculatePossessionWidth(opponentPossession),
        }}
      >
        <span className="mobile:hidden">{opponentPossession}%</span>
        <span className="truncate whitespace-nowrap">{opponentNickName}</span>
      </section>
    </figure>
  );
};

export default PossessionIndicator;
