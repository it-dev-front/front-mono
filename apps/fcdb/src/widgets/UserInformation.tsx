"use client";

import { Score } from "@/features/profile/ui/Score";
import { ProfileBox } from "@/features/profile/ui/ProfileBox";
import { TierBadge } from "@/features/tier/ui/TierBadge";
import { ScoreRefresh } from "@/entities/profile/ui/ScoreRefresh";
import { ReactElement } from "react";
import { useMediaQuery } from "react-responsive";
import { PlayerProfileCard } from "@/entities/profile/ui/PlayerProfileCard";
import { RotateCcw } from "lucide-react";
import { Typography } from "@/shared/ui/typography";
import { DivisionLabel } from "@/entities/tier/ui/DivisionLabel";
import { TierImage } from "@/entities/tier/ui/TierImage";

const MOCK_USER_DATA = {
  ouid: "string",
  nickname: "훈다",
  level: 93,
};

const MOCK_TIER_DATA = {
  matchType: 52,
  division: 900,
  achievementDate: "2025-04-14T06:34:49",
};

const PcWidget = (): ReactElement => {
  return (
    <div className="flex items-center justify-between bg-gray-900 max-w-[1080px] h-[240px] p-[40px]">
      <ProfileBox />
      <div className="flex items-end gap-[66px]">
        <TierBadge />
        <Score />
        <ScoreRefresh updatedAt={"10분전"} />
      </div>
    </div>
  );
};

const MobileWidget = (): ReactElement => {
  return (
    <div className="flex flex-col items-start justify-between bg-gray-900 px-[20px] py-[16px] gap-[16px]">
      <div className="w-full flex items-center justify-between gap-[24px]">
        <PlayerProfileCard spId={289015723} />
        <Score />
      </div>
      <div className="w-full flex items-center justify-start gap-[16px]">
        <TierImage divisionId={MOCK_TIER_DATA.division} />
        <div className={"flex flex-col gap-[8px]"}>
          <DivisionLabel divisionId={MOCK_TIER_DATA.division} />
          <Typography fontSize={20}>{MOCK_USER_DATA.nickname}</Typography>
          <Typography fontSize={18}>Lv. {MOCK_USER_DATA.level}</Typography>
        </div>
      </div>

      <div className="w-full flex flex-col gap-[8px] text-sm text-gray-400">
        <p className="text-[14px] w-full text-right">10분전 업데이트</p>
        <button className="flex items-center justify-center gap-1 w-full h-[40px] bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white text-m px-3 py-1.5 rounded-md transition">
          전적갱신
          <RotateCcw size={14} className="text-primary-300" />
        </button>
      </div>
    </div>
  );
};

export const UserInformation = (): ReactElement => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? <MobileWidget /> : <PcWidget />;
};
