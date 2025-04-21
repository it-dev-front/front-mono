import { Header } from "@/widgets/Header";
import { UserSearchForm } from "@/widgets/UserSearchForm";
import { Footer } from "@/widgets/Footer";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen pt-[60px]">
      <Header />
      <main className="flex-grow flex justify-center pb-[520px]">
        <UserSearchForm />
      </main>
      <Footer />
    </div>
  );
};
