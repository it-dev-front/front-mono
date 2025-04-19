import { Score } from "@/features/profile/ui/Score";
import { ProfileBox } from "@/features/profile/ui/ProfileBox";
import { TierBadge } from "@/features/tier/ui/TierBadge";
import { ScoreRefresh } from "@/entities/profile/ui/ScoreRefresh";

export const UserInformation = () => {
  return (
    <div className="flex items-center justify-between bg-[#212121] max-w-[1080px] h-[240px] p-[40px]">
      <ProfileBox />
      <div className="flex items-end gap-[66px]">
        <TierBadge />
        <Score />
        <ScoreRefresh updatedAt={"10분전"} />
      </div>
    </div>
  );
};
