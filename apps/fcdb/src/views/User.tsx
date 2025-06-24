import { UserProfileFetcher } from "@/features/profile/ui/UserProfileFetcher";
import { MatchSummaryFetcher } from "@/features/match/ui/MatchSummaryFetcher";
import MatchProvider from "@/entities/match/providers/MatchProvider";
import { redirect } from "next/navigation";
import { getOuidApi } from "@/entities/id/api";

export const User = async ({ nickname }: { nickname: string }) => {
  const decodedNickname = decodeURIComponent(nickname);

  try {
    const result = await getOuidApi(decodedNickname);

    if (!result.ouid) {
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log("에러 메시지:", errorMessage);
    if (errorMessage.includes("OPENAPI00007")) {
      console.log("🔄 FC Online API 서버 일시적 오류 - 홈으로 리다이렉트");
    } else {
      console.log("🔄 기타 API 에러 - 홈으로 리다이렉트");
    }

    redirect("/");
  }
};
