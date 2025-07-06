import { infiniteRankingQueryOptions } from "@/entities/ranking/model/queries";
import { RankingTableRowList } from "@/widgets/ranking/RankingTableRowList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Ranking() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(infiniteRankingQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RankingTableRowList />
    </HydrationBoundary>
  );
}

export const revalidate = 60;
