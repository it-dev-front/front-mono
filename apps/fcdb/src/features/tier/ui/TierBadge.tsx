import { TierBadgeType } from "@/entities/tier/types/tierType";
import { DivisionLabel } from "@/entities/tier/ui/DivisionLabel";
import { MatchTypeLabel } from "@/entities/tier/ui/MatchTypeLabel";
import { TierImage } from "@/entities/tier/ui/TierImage";
import { ReactElement } from "react";

export const getOfficialMatchType = (
  data: TierBadgeType | TierBadgeType[]
): TierBadgeType | null => {
  if (Array.isArray(data)) {
    return data.find((item) => item.matchType === 50) ?? null;
  }
  return data.matchType === 50 ? data : null;
};

interface TierBadgeProps {
  data: TierBadgeType | TierBadgeType[];
}

export const TierBadge = ({ data }: TierBadgeProps): ReactElement => {
  const parseData = getOfficialMatchType(data);

  if (!parseData) return <div />;

  return (
    <div className="flex flex-col items-center space-y-2">
      <MatchTypeLabel matchType={parseData.matchType} />
      <TierImage divisionId={parseData?.division} />
      <DivisionLabel divisionId={parseData?.division} />
    </div>
  );
};
