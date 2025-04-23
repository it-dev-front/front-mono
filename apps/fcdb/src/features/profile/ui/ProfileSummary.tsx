"use client";

import { ReactElement, useEffect, useState } from "react";
import { ProfileBox } from "./ProfileBox";
import { TierBadge } from "@/features/tier/ui/TierBadge";
import { Score } from "./Score";
import {
  MobileScoreRefresh,
  ScoreRefresh,
} from "@/entities/profile/ui/ScoreRefresh";
import { PlayerProfileCard } from "@/entities/profile/ui/PlayerProfileCard";
import { TierImage } from "@/entities/tier/ui/TierImage";
import { DivisionLabel } from "@/entities/tier/ui/DivisionLabel";
import { Typography } from "@/shared/ui/typography";

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

/**@description Mobile 프로필 */
export const MobileProfileSummary = (): ReactElement => {
  return (
    <div className="mx-auto h-full w-full flex flex-col items-start justify-between bg-gray-900 px-[20px] py-[16px] gap-[16px]">
      <div className="w-full flex items-center justify-evenly gap-[24px]">
        <PlayerProfileCard spId={289015723} />
        <Score />
      </div>
      <div className="flex items-center justify-evenly w-full">
        <div className="w-[200px] flex items-center justify-start gap-[16px]">
          <TierImage divisionId={MOCK_TIER_DATA.division} />
          <div className={"flex flex-col gap-[8px]"}>
            <DivisionLabel divisionId={MOCK_TIER_DATA.division} />
            <Typography fontSize={20}>{MOCK_USER_DATA.nickname}</Typography>
            <Typography fontSize={18}>Lv. {MOCK_USER_DATA.level}</Typography>
          </div>
        </div>
        <div className="w-[120px] h-[80px] inline-block" />
      </div>

      <MobileScoreRefresh updatedAt="10분전" />
    </div>
  );
};

/**@description Pc 프로필 */
export const PcProfileSummary = (): ReactElement => {
  return (
    <div className="mx-auto h-full w-full flex items-center justify-between bg-gray-900 max-w-[1080px] h-[240px] p-[40px]">
      <div className="flex items-center gap-[24px]">
        <PlayerProfileCard spId={289015723} />
        <ProfileBox
          user={{
            nickname: MOCK_USER_DATA.nickname,
            level: MOCK_USER_DATA.level,
          }}
        />
      </div>
      <div className="flex items-end gap-[66px]">
        <TierBadge data={MOCK_TIER_DATA} />
        <Score />
        <ScoreRefresh updatedAt={"10분전"} />
      </div>
    </div>
  );
};

export const ProfileSummary = (): React.ReactElement | null => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 초기 사이즈 체크
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) return null;

  return isMobile ? <MobileProfileSummary /> : <PcProfileSummary />;
};
