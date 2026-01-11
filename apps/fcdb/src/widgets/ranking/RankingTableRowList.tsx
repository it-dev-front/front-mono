"use client";

import { RankingTableRow } from "@/features/ranking/ui/RankingTableRow";
import { useInfiniteRankingData } from "@/features/ranking/hooks/useInfiniteRankingData";
import { ShowMoreButton } from "@/shared/ui/button/ShowMoreButton";
import { Fragment } from "react";

export const RankingTableRowList = () => {
  const { allItems, hasNextPage, isFetchingNextPage, error, fetchNextPage } =
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
      <tbody className="flex flex-col gap-1">
        {allItems.map((record) => (
          <Fragment key={record.rankNo}>
            <RankingTableRow record={record} />
          </Fragment>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td>
            <div className="w-full flex justify-center items-center my-[16px]">
              <ShowMoreButton
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                loading={isFetchingNextPage}
              />
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};
