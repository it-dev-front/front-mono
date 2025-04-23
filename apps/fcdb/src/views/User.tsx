import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { ProfileSummary } from "@/features/profile/ui/ProfileSummary";

interface UserPageProps {
  name: string;
}

export const User = ({ name }: UserPageProps) => {
  return (
    <div>
      <Header />
      <div className="w-full min-w-[366px] flex flex-col min-h-screen pt-[60px]">
        <main className="w-full flex-grow flex justify-center py-0 md:py-[1rem]">
          <ProfileSummary />
        </main>
        <Footer />
      </div>
    </div>
  );
};
