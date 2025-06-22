import { infiniteRankingQueryOptions } from "@/entities/ranking/model/queries";
import RankingPageHeader from "@/widgets/ranking/RankingPageHeader";
import { RankingTable } from "@/widgets/ranking/RankingTable";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Image from "next/image";

export default async function Ranking() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(infiniteRankingQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative w-full min-w-[366px] flex flex-col min-h-screen pt-[62px]">
        <Image
          src="/images/ranking-bg.png"
          width={887}
          height={485}
          alt="ranking-bg"
          className="object-cover fixed bottom-0 left-0 z-0 mobile:hidden"
        />
        <div className="flex flex-col items-center max-w-[1080px] flex-grow w-full m-auto z-1">
          <RankingPageHeader />
          <RankingTable />
        </div>
      </main>
    </HydrationBoundary>
  );
}

export const revalidate = 60;
