import { TierBadgeType } from "@/entities/tier/types/tierType";
import { DivisionLabel } from "@/entities/tier/ui/DivisionLabel";
import { MatchTypeLabel } from "@/entities/tier/ui/MatchTypeLabel";
import { TierImage } from "@/entities/tier/ui/TierImage";
import { ReactElement } from "react";

export const parseTierData = (
  data: TierBadgeType | TierBadgeType[]
): TierBadgeType | null => {
  if (Array.isArray(data)) {
    if (data.length === 0) return null;
    const sorted = data.sort(
      (a, b) =>
        new Date(b.achievementDate).getTime() -
        new Date(a.achievementDate).getTime()
    );
    return sorted[0] ?? null;
  }

  return data ?? null;
};

interface TierBadgeProps {
  data: TierBadgeType | TierBadgeType[];
}

export const TierBadge = ({ data }: TierBadgeProps): ReactElement => {
  const parseData = parseTierData(data);

  if (!parseData) return <div>정보가 없움</div>;

  return (
    <div className="flex flex-col items-center space-y-2">
      <MatchTypeLabel matchType={parseData.matchType} />
      <TierImage divisionId={parseData?.division} />
      <DivisionLabel divisionId={parseData?.division} />
    </div>
  );
};
