import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

export const Ranking = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen pt-[60px]">
        <Header />
        <main className="flex-grow flex justify-center pb-[520px]">
          <div>
            <div className="h-40" />
            <ol>
              <li>ranking-page</li>
            </ol>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
