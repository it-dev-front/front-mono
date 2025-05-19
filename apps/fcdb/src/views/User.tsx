import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { ProfileSummary } from "@/features/profile/ui/ProfileSummary";
import { getOuid } from "@/entities/id/api";

interface UserPageProps {
  name: string;
}

export const User = async ({ name }: UserPageProps) => {
  const { ouid } = await getOuid(name);

  console.log("@@@ ouid : ", ouid);
  return (
    <div>
      <Header />
      <div className="w-full min-w-[366px] flex flex-col min-h-screen pt-[62px]">
        <main className="w-full flex flex-grow flex-col gap-[16px] items-center py-0 md:py-[1rem] border-t border-[#424242] md:border-t-0">
          <ProfileSummary />
        </main>
        <Footer />
      </div>
    </div>
  );
};
