import { ProfileSummary } from "@/features/profile/ui/ProfileSummary";
import MatchSummary from "@/widgets/match/MatchSummary";
import HubPageLayout from "./layout";

export default function HubPage() {
  return (
    <HubPageLayout>
      <ProfileSummary />
      <MatchSummary />
      <MatchSummary />
      <MatchSummary />
    </HubPageLayout>
  );
}
