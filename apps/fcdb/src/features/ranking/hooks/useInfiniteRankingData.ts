"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { infiniteRankingQueryOptions } from "@/entities/ranking/model/queries";

interface UseInfiniteRankingDataProps {
  enabled?: boolean;
}

export function useInfiniteRankingData<TargetElement extends HTMLElement>({
  enabled = true,
}: UseInfiniteRankingDataProps = {}) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(infiniteRankingQueryOptions(enabled));

  const allItems = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  return {
    allItems,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
    status,
    fetchNextPage,
  };
}
