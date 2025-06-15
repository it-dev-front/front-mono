"use client";

import { RankingTableRow } from "@/features/ranking/ui/RankingTableRow";
import { RankingTableHeader } from "@/widgets/ranking/RankingTableHeader";
import { useInfiniteRanking } from "@/entities/ranking/model/queries";
import { BallSpinner } from "@/shared/ui/spinner/BallSpinner";
import { Fragment } from "react";

export const RankingTable = () => {
  const { allItems, hasNextPage, isFetchingNextPage, error, loadMoreRef } =
    useInfiniteRanking();

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <table className="w-full">
      <RankingTableHeader />

      <tbody className="flex flex-col gap-1 pb-21">
        {allItems.map((record) => (
          <Fragment key={record.rankNo}>
            <RankingTableRow record={record} />
          </Fragment>
        ))}

        {hasNextPage && <div ref={loadMoreRef} className="h-4" />}
        {isFetchingNextPage && (
          <div className="flex justify-center items-center h-auto">
            <BallSpinner />
          </div>
        )}
      </tbody>
    </table>
  );
};
