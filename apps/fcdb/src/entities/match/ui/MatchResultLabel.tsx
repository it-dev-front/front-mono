import React from "react";
import clsx from "clsx";
import { MATCH_RESULT } from "../constants";
import { useMediaQuery } from "react-responsive";

export interface MatchResultProps {
  matchResult: keyof typeof MATCH_RESULT;
}

const RESULT_COLOR_MAP: Record<MatchResultProps["matchResult"], string> = {
  승: "text-win",
  무: "text-draw",
  패: "text-loss",
};

const MatchResultLabel = ({ matchResult }: MatchResultProps) => {
  const isMobile = useMediaQuery({ maxWidth: 360 });
  const text = MATCH_RESULT[matchResult];
  const colorClass = RESULT_COLOR_MAP[matchResult];

  return (
    <span className={clsx("h-[23px] text-[20px]", colorClass)}>
      {isMobile ? text[0] : text}
    </span>
  );
};

export default MatchResultLabel;
