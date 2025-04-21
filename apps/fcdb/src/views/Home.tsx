import { Header } from "@/widgets/Header";
import { UserSearchForm } from "@/widgets/UserSearchForm";
import { Footer } from "@/widgets/Footer";
import { Banner } from "@/widgets/Banner";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen pt-[60px]">
      <Header />
      <main className="flex-grow flex justify-center pb-[520px]">
        <div>
          <div className="h-40" />
          <Banner />
          <div className="h-6" />
          <UserSearchForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};
