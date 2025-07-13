import clsx from "clsx";
import { MIN_WIDTH } from "../constants";
import { formatPossession } from "../lib/getMatchInfo";

interface PossessionIndicatorProps {
  userPossession: number;
  opponentPossession: number;
  userNickName: string;
  opponentNickName: string;
}

const PossessionIndicator = ({
  userPossession = 0,
  opponentPossession = 0,
  userNickName,
  opponentNickName,
}: PossessionIndicatorProps) => {
  const sectionBaseStyle =
    "flex items-center justify-between gap-[30px] px-[24px] mobile:px-[16px]";
  const userSectionStyle = clsx(sectionBaseStyle, "bg-gray-800");
  const opponentSectionStyle = clsx(sectionBaseStyle, "bg-gray-700");

  const formattedPosession = formatPossession(
    userPossession,
    opponentPossession
  );

  return (
    <figure className="flex w-full h-[36px] mobile:h-[30px] text-[20px] mobile:text-[10px] font-bold  mobile:pt-[10px]">
      <section
        className={userSectionStyle}
        style={{
          width: formattedPosession.userPossession,
        }}
      >
        <span className="truncate whitespace-nowrap">{userNickName}</span>
        <span className="mobile:hidden">
          {formattedPosession.userPossession}
        </span>
      </section>

      <section
        className={opponentSectionStyle}
        style={{
          width: formattedPosession.opponentPossession,
        }}
      >
        <span className="mobile:hidden">
          {formattedPosession.opponentPossession}
        </span>
        <span className="truncate whitespace-nowrap">{opponentNickName}</span>
      </section>
    </figure>
  );
};

export default PossessionIndicator;
