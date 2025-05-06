import { ReactElement } from "react";
import { matchTypeMetaData } from "@/shared/lib/matchTypeMetaData";
import formatRelativeTime from "@/shared/utils/formatRelativeTime";

interface MatchStatusCardProps {
  matchType: (typeof matchTypeMetaData)[number]["matchtype"];
  matchResult: "승" | "패" | "무";
  matchDate: Date;
}

const convertMatchTypeToMatchName = (
  matchType: MatchStatusCardProps["matchType"]
) => {
  return matchTypeMetaData.find((item) => item.matchtype === matchType)?.desc;
};

//TODO: tailwind에 맞게 개선/분리 필요
const getMatchResultColor = (matchResult: "승" | "패" | "무") => {
  return matchResult === "승"
    ? "#ABEE02"
    : matchResult === "패"
      ? "#FC5555"
      : "#cfcececc";
};

export const MatchStatusCard = ({
  matchType,
  matchResult,
  matchDate,
}: MatchStatusCardProps): ReactElement => {
  return (
    <div className="w-[80px] h-[103px] flex flex-col gap-4 items-center text-color-white text-center leading-none">
      <div className="flex flex-col gap-2">
        <div className="text-[16px] text-center">
          {convertMatchTypeToMatchName(matchType)}
        </div>
        <div
          className="text-[20px]"
          style={{ color: getMatchResultColor(matchResult) }}
        >
          {matchResult}
        </div>
      </div>
      <div className="w-[60px] h-[0px] border-[1px] border-color-white" />
      <div className="text-[16px]">{formatRelativeTime(matchDate)}</div>
    </div>
  );
};
