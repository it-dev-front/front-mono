import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

import { UserInformation } from "@/widgets/UserInformation";

interface UserPageProps {
  name: string;
}

export const User = ({ name }: UserPageProps) => {
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen pt-[60px]">
        <main className="flex-grow flex justify-center pb-[520px]">
          <div>
            <div className="h-4" />
            <UserInformation />
            <p className="pt-4">{name}</p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
