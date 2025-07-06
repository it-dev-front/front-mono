"use client";

import { RankingTableRow } from "@/features/ranking/ui/RankingTableRow";
import { useInfiniteRankingData } from "@/features/ranking/hooks/useInfiniteRankingData";
import { BallSpinner } from "@/shared/ui/spinner/BallSpinner";
import { Fragment } from "react";

export const RankingTableRowList = () => {
  const { allItems, hasNextPage, isFetchingNextPage, error, loadMoreRef } =
    useInfiniteRankingData<HTMLDivElement>();

  if (error) {
    return (
      <tbody className="text-center py-8 text-red-500">
        <tr>
          <td>데이터를 불러오는 중 오류가 발생했습니다.</td>
        </tr>
      </tbody>
    );
  }

  return (
    <>
      <tbody className="flex flex-col gap-1 pb-21">
        {allItems.map((record) => (
          <Fragment key={record.rankNo}>
            <RankingTableRow record={record} />
          </Fragment>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td>
            {hasNextPage && <div ref={loadMoreRef} className="h-4" />}
            {isFetchingNextPage && (
              <div className="flex justify-center items-center h-auto">
                <BallSpinner />
              </div>
            )}
          </td>
        </tr>
      </tfoot>
    </>
  );
};
