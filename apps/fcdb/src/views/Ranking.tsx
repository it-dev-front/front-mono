"use client";

import RankingPageHeader from "@/widgets/ranking/RankingPageHeader";
import { RankingTable } from "@/widgets/ranking/RankingTable";

export default function Ranking() {
  return (
    <>
      <main className="w-full min-w-[366px] flex flex-col min-h-screen pt-[62px]">
        <div className="flex flex-col items-center max-w-[1080px] flex-grow w-full m-auto">
          <RankingPageHeader />
          <RankingTable />
        </div>
      </main>
    </>
  );
}
