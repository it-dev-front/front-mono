import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { getRanking } from "@/entities/ranking/api";

export default async function Ranking() {
  const pageNumber = 1;
  const { data, error, hasNextPage } = await getRanking(pageNumber);

  console.log("@@@ data", data);
  console.log("@@@ hasNextPage", hasNextPage);

  if (error) {
    console.error("Error fetching ranking data:", error);
  }

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
}
