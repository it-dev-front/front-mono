"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { getRanking } from "../api";

interface UseInfiniteRankingProps {
  enabled?: boolean;
}

export function useInfiniteRanking({
  enabled = true,
}: UseInfiniteRankingProps = {}) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const rankingQueryFn = async (page: number) => {
    const result = await getRanking(page);
    if (result.error) {
      throw new Error(result.error.message);
    }
    return {
      data: result.data || [],
      hasNextPage: result.hasNextPage || false,
    };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["ranking"],
    queryFn: ({ pageParam = 1 }) => rankingQueryFn(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNextPage ? pages.length + 1 : undefined,
    initialPageParam: 1,
    enabled,
  });

  const allItems = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target?.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    allItems,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
    status,
    fetchNextPage,
    loadMoreRef,
  };
}
