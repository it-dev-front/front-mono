import { ReactElement } from "react";
import { ProfileBox } from "./ProfileBox";
import { TierBadge, getOfficialMatchType } from "@/features/tier/ui/TierBadge";
import { Score } from "./Score";
import {
  MobileScoreRefresh,
  ScoreRefresh,
} from "@/entities/profile/ui/ScoreRefresh";
import { PlayerProfileCard } from "@/entities/profile/ui/PlayerProfileCard";
import { TierImage } from "@/entities/tier/ui/TierImage";
import { DivisionLabel } from "@/entities/tier/ui/DivisionLabel";
import {
  BestGradeResponse,
  UserProfileResponse,
} from "@/entities/fc-database/types";
import { ScorePanelType } from "@/entities/match/types/match.info.types";
import { PlayerType } from "@/entities/match/types/match.types";
import {
  MobileProfileBoxLoading,
  PcProfileBoxLoading,
} from "@/entities/profile/ui/ProfileBoxLoading";

/**@description Mobile 프로필 */
export const MobileProfileSummary = ({
  profileData,
  ratingData,
  scorePanel,
  bestPlayer,
  updatedAt,
}: {
  profileData: UserProfileResponse;
  ratingData: BestGradeResponse;
  scorePanel: ScorePanelType;
  bestPlayer: (PlayerType & { total: number }) | null;
  updatedAt: Date;
}): ReactElement => {
  const tierData = getOfficialMatchType(ratingData);

  const renderTierImg = () => {
    if (!tierData) {
      return null;
    }

    return <TierImage divisionId={tierData?.division || 0} />;
  };

  const renderDivisionLabel = () => {
    if (!tierData) {
      return null;
    }

    return <DivisionLabel divisionId={tierData?.division || 0} />;
  };

  return (
    <div className="mx-auto h-auto w-full flex flex-col items-start justify-between bg-gray-900 px-[20px] py-[16px] gap-[16px]">
      <div className="w-full flex items-center justify-evenly gap-[24px]">
        {bestPlayer && <PlayerProfileCard spId={bestPlayer?.spId} />}
        <Score score={scorePanel} />
      </div>
      <div className="flex items-center w-full justify-evenly">
        <div className="w-[200px] flex items-center justify-start gap-[16px]">
          {renderTierImg()}
          <div className={"flex flex-col gap-[8px]"}>
            {renderDivisionLabel()}
            <p className="text-[20px]">{profileData.nickname}</p>
            <p className="text-[18px]">Lv. {profileData.level}</p>
          </div>
        </div>
        <div className="w-[120px] h-[80px] inline-block" />
      </div>

      <MobileScoreRefresh updatedAt={updatedAt} />
    </div>
  );
};

/**@description Pc 프로필 */
export const PcProfileSummary = ({
  profileData,
  ratingData,
  scorePanel,
  bestPlayer,
  updatedAt,
}: {
  profileData: UserProfileResponse;
  ratingData: BestGradeResponse;
  scorePanel: ScorePanelType;
  bestPlayer: (PlayerType & { total: number }) | null;
  updatedAt: Date;
}): ReactElement => {
  return (
    <div className="mx-auto w-full flex items-center justify-between bg-gray-900 max-w-[1080px] h-[240px] p-[40px] rounded-lg my-[8px]">
      <div className="flex items-center gap-[24px]">
        {bestPlayer && <PlayerProfileCard spId={bestPlayer?.spId} />}
        <ProfileBox
          user={{
            nickname: profileData.nickname,
            level: profileData.level,
          }}
        />
      </div>
      <div className="flex items-end gap-[66px]">
        <TierBadge data={ratingData} />
        <Score score={scorePanel} />
        <ScoreRefresh updatedAt={updatedAt} />
      </div>
    </div>
  );
};

export const ProfileSummary = ({
  profileData,
  ratingData,
  scorePanel,
  bestPlayer,
  updatedAt,
  isLoading,
}: {
  profileData: UserProfileResponse;
  ratingData: BestGradeResponse;
  scorePanel: ScorePanelType;
  bestPlayer: (PlayerType & { total: number }) | null;
  updatedAt: Date;
  isLoading: boolean;
}): React.ReactElement => {
  return (
    <>
      <div className="block md:hidden w-full">
        {isLoading ? (
          <MobileProfileBoxLoading />
        ) : (
          <>
            <MobileProfileSummary
              profileData={profileData}
              ratingData={ratingData}
              scorePanel={scorePanel}
              bestPlayer={bestPlayer}
              updatedAt={updatedAt}
            />
          </>
        )}
      </div>

      {/* PC 전용 */}
      <div className="hidden md:block w-full">
        {isLoading ? (
          <PcProfileBoxLoading />
        ) : (
          <>
            <PcProfileSummary
              profileData={profileData}
              ratingData={ratingData}
              scorePanel={scorePanel}
              bestPlayer={bestPlayer}
              updatedAt={updatedAt}
            />
          </>
        )}
      </div>
    </>
  );
};
