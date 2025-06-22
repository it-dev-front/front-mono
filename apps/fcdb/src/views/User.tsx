import { UserProfileFetcher } from "@/features/profile/ui/UserProfileFetcher";
import { MatchSummaryFetcher } from "@/features/match/ui/MatchSummaryFetcher";
import MatchProvider from "@/entities/match/providers/MatchProvider";
import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const User = async ({ params }: { params: { name: string } }) => {
  const { name } = params;
  const userApi = await FcClient.get("User");
  const result = await userApi.getOuid(name);

  if (!result.ouid) {
    toast.error("존재하지 않는 유저입니다.");
    redirect("/");
  }

  return (
    <>
      <main className="w-full min-w-[366px] flex flex-col min-h-screen pt-[62px]">
        <MatchProvider ouid={result.ouid}>
          <div className="w-full flex justify-center py-0 md:py-[1rem] border-t border-[#424242] md:border-t-0">
            <UserProfileFetcher ouid={result.ouid} />
          </div>
          <div className="w-full flex flex-col items-center gap-[8px]">
            <MatchSummaryFetcher />
          </div>
        </MatchProvider>
      </main>
    </>
  );
};
