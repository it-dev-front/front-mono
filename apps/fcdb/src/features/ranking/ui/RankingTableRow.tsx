"use client";

import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { CircularProgressBar } from "@/shared/ui/progressbar/CircularProgressBar";
import { RankingRecord } from "@/entities/ranking/types/ranking-record.types";

interface RankingTableRowProps {
  record: RankingRecord;
}

export const RankingTableRow = ({ record }: RankingTableRowProps) => {
  const router = useRouter();
  const recordData = record.record || { win: 0, draw: 0, lose: 0 };
  const totalGames = recordData.win + recordData.draw + recordData.lose;
  const winCount = recordData.win || 0;
  const loseCount = recordData.lose || 0;

  const handleRowClick = () => {
    if (record.nickname) router.push(`user/${record.nickname}`);
  };

  return (
    <tr
      className="flex items-center h-[84px] px-10 py-3 bg-gray-900 rounded-[8px] text-[16px] text-white mobile:text-[12px] mobile:px-[15px] mobile:py-[3px] mobile:justify-between cursor-pointer hover:bg-gray-800 transition-colors"
      onClick={handleRowClick}
    >
      <td className="w-20 text-center text-[24px] mobile:w-10 mobile:text-[18px]">
        {record.rankNo}
      </td>
      <td className="flex flex-col gap-1 text-center w-70 mobile:w-20">
        <span>{record.nickname || "알 수 없음"}</span>
        <span className="mobile:hidden">{record.clubValue || "-"}</span>
      </td>
      <td className="text-center w-50 mobile:w-20">
        {(record.rankingScore || 0).toLocaleString("ko-KR", {
          maximumFractionDigits: 0,
        })}
      </td>
      <td className="text-center w-50 mobile:hidden">
        {totalGames}전 {winCount}승 {loseCount}패
      </td>
      <td className="text-center w-30 mobile:w-20">
        <CircularProgressBar
          percentage={Math.round(record.odds || 0)}
          size={60}
          strokeWidth={3}
        />
      </td>
      <td className="flex justify-center text-center w-30 mobile:w-[50px]">
        <div className="relative overflow-hidden rounded-full w-15 h-15 mobile:w-10 mobile:h-10">
          {record.rankBestImg && (
            <Image
              src={record.rankBestImg}
              fill
              alt="최고등급"
              sizes="(max-width: 1024px) 40px, 60px"
            />
          )}
        </div>
      </td>
    </tr>
  );
};
