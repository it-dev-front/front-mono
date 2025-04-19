import { TierBadgeType } from "@/entities/tier/types/tierType";
import { DivisionLabel } from "@/entities/tier/ui/DivisionLabel";
import { MatchTypeLabel } from "@/entities/tier/ui/MatchTypeLabel";
import { TierImage } from "@/entities/tier/ui/TierImage";
import { ReactElement } from "react";

const MOCK_DATA: TierBadgeType[] = [
  {
    matchType: 50,
    division: 800,
    achievementDate: "2025-04-15T09:48:41",
  },
  {
    matchType: 52,
    division: 900,
    achievementDate: "2025-04-14T06:34:49",
  },
];

const parseObject = (
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

export const TierBadge = (): ReactElement => {
  const data = parseObject(MOCK_DATA);

  if (!data) return <div>정보가 없움</div>;

  return (
    <div className="flex flex-col items-center space-y-2">
      <MatchTypeLabel matchType={data.matchType} />
      <TierImage divisionId={data?.division} />
      <DivisionLabel divisionId={data?.division} />
    </div>
  );
};
