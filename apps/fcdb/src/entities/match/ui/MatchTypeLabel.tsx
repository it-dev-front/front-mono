import { matchTypeMetaData } from "@/shared/lib/matchTypeMetaData";

export interface MatchTypeLabelProps {
  matchType: (typeof matchTypeMetaData)[number]["matchtype"];
}

const MatchTypeLabel = ({ matchType }: MatchTypeLabelProps) => {
  const convertMatchTypeToMatchName = (
    matchType: MatchTypeLabelProps["matchType"]
  ) => {
    return matchTypeMetaData.find((item) => item.matchtype === matchType)?.desc;
  };

  return (
    <div className="text-[16px] text-center">
      {convertMatchTypeToMatchName(matchType)}
    </div>
  );
};

export default MatchTypeLabel;
