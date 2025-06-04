import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { UserProfileFetcher } from "@/features/profile/ui/UserProfileFetcher";
import MatchSummary from "@/widgets/match/MatchSummary";

export const User = async () => {
  return (
    <>
      <Header />
      <main className="w-full min-w-[366px] flex flex-col min-h-screen pt-[62px] items-center">
        <div className="w-full flex justify-center py-0 md:py-[1rem] border-t border-[#424242] md:border-t-0">
          <UserProfileFetcher />
        </div>
        <MatchSummary />
      </main>
      <Footer />
    </>
  );
};
