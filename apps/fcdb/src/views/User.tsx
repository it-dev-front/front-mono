import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { UserProfileFetcher } from "@/features/profile/ui/UserProfileFetcher";
import { MatchSummaryFetcher } from "@/features/match/ui/MatchSummaryFetcher";
import MatchProvider from "@/entities/match/providers/MatchProvider";

export const User = async () => {
  return (
    <>
      <Header />
      <main className="w-full min-w-[366px] flex flex-col min-h-screen pt-[62px]">
        <MatchProvider>
          <div className="w-full flex justify-center py-0 md:py-[1rem] border-t border-[#424242] md:border-t-0">
            <UserProfileFetcher />
          </div>
          <div className="w-full flex flex-col items-center gap-[8px]">
            <MatchSummaryFetcher />
          </div>
        </MatchProvider>
      </main>
      <Footer />
    </>
  );
};
