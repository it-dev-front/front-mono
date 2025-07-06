"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { infiniteRankingQueryOptions } from "@/entities/ranking/model/queries";

interface UseInfiniteRankingDataProps {
  enabled?: boolean;
}

export function useInfiniteRankingData<TargetElement extends HTMLElement>({
  enabled = true,
}: UseInfiniteRankingDataProps = {}) {
  const loadMoreRef = useRef<TargetElement>(null);

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
