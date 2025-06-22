import { infiniteQueryOptions } from "@tanstack/react-query";
import { getRanking } from "../api";

const fetchRankingPage = async (page: number) => {
  const result = await getRanking(page);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return {
    data: result.data || [],
    hasNextPage: result.hasNextPage || false,
  };
};

export const infiniteRankingQueryOptions = (enabled: boolean = true) =>
  infiniteQueryOptions({
    queryKey: ["ranking"],
    queryFn: ({ pageParam = 1 }) => fetchRankingPage(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNextPage ? pages.length + 1 : undefined,
    initialPageParam: 1,
    enabled,
  });
