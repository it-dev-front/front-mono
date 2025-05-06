import { ReactElement } from "react";
import { ProfileBox } from "./ProfileBox";
import { parseTierData, TierBadge } from "@/features/tier/ui/TierBadge";
import { Score } from "./Score";
import {
  MobileScoreRefresh,
  ScoreRefresh,
} from "@/entities/profile/ui/ScoreRefresh";
import { PlayerProfileCard } from "@/entities/profile/ui/PlayerProfileCard";
import { TierImage } from "@/entities/tier/ui/TierImage";
import { DivisionLabel } from "@/entities/tier/ui/DivisionLabel";
import { Typography } from "@/shared/ui/typography";
import {
  BestGradeResponse,
  UserProfileResponse,
} from "@/entities/fc-database/types";

/**@description Mobile 프로필 */
export const MobileProfileSummary = ({
  profileData,
  ratingData,
}: {
  profileData: UserProfileResponse;
  ratingData: BestGradeResponse;
}): ReactElement => {
  const tierData = parseTierData(ratingData);

  return (
    <div className="mx-auto h-auto w-full flex flex-col items-start justify-between bg-gray-900 px-[20px] py-[16px] gap-[16px]">
      <div className="w-full flex items-center justify-evenly gap-[24px]">
        <PlayerProfileCard spId={289015723} />
        <Score />
      </div>
      <div className="flex items-center justify-evenly w-full">
        <div className="w-[200px] flex items-center justify-start gap-[16px]">
          <TierImage divisionId={tierData?.division || 0} />
          <div className={"flex flex-col gap-[8px]"}>
            <DivisionLabel divisionId={tierData?.division || 0} />
            <Typography fontSize={20}>{profileData.nickname}</Typography>
            <Typography fontSize={18}>Lv. {profileData.level}</Typography>
          </div>
        </div>
        <div className="w-[120px] h-[80px] inline-block" />
      </div>

      <MobileScoreRefresh updatedAt="10분전" />
    </div>
  );
};

/**@description Pc 프로필 */
export const PcProfileSummary = ({
  profileData,
  ratingData,
}: {
  profileData: UserProfileResponse;
  ratingData: BestGradeResponse;
}): ReactElement => {
  return (
    <div className="mx-auto w-full flex items-center justify-between bg-gray-900 max-w-[1080px] h-[240px] p-[40px]">
      <div className="flex items-center gap-[24px]">
        <PlayerProfileCard spId={289015723} />
        <ProfileBox
          user={{
            nickname: profileData.nickname,
            level: profileData.level,
          }}
        />
      </div>
      <div className="flex items-end gap-[66px]">
        <TierBadge data={ratingData} />
        <Score />
        <ScoreRefresh updatedAt={"10분전"} />
      </div>
    </div>
  );
};

export const ProfileSummary = ({
  profileData,
  ratingData,
}: {
  profileData: UserProfileResponse;
  ratingData: BestGradeResponse;
}): React.ReactElement => {
  return (
    <>
      <div className="block md:hidden w-full">
        <MobileProfileSummary
          profileData={profileData}
          ratingData={ratingData}
        />
      </div>

      {/* PC 전용 */}
      <div className="hidden md:block w-full">
        <PcProfileSummary profileData={profileData} ratingData={ratingData} />
      </div>
    </>
  );
};
