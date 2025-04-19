import { matchTypeMetaData } from "@/shared/lib/matchTypeMetaData";
import { ReactElement } from "react";

interface MatchTypeLabelProps {
  matchType: number;
};

const findMatchTypeLabel = (matchType: number): string => {
  return (
    matchTypeMetaData.find((item) => item.matchtype === matchType)?.desc || ""
  );
};

export const MatchTypeLabel = ({
  matchType,
}: MatchTypeLabelProps): ReactElement => {
  return <p>{findMatchTypeLabel(matchType)}</p>;
};
