import { Header } from "@/widgets/Header";
import { getRanking } from "@/entities/ranking/api";
import RankingPageHeader from "@/widgets/ranking/RankingPageHeader";
import Image from "next/image";

export default async function Ranking() {
  const pageNumber = 1;
  const { data, error, hasNextPage } = await getRanking(pageNumber);

  console.log("@@@ data", data);
  console.log("@@@ hasNextPage", hasNextPage);

  if (error) {
    console.error("Error fetching ranking data:", error);
  }

  return (
    <>
      <Header />
      <main className="w-full min-w-[366px] flex flex-col min-h-screen pt-[62px]">
        <div className="flex flex-col items-center max-w-[1080px] flex-grow w-full m-auto">
          <RankingPageHeader />
          <ul className="flex h-[75px] px-10 py-4 text-[20px]">
            <li className="w-20 text-center">순위</li>
            <li className="text-center w-70">구단주</li>
            <li className="text-center w-50 ">랭킹점수</li>
            <li className="text-center w-50">전적</li>
            <li className="text-center w-30">승률</li>
            <li className="text-center w-30">최고등급</li>
          </ul>

          <div className="flex flex-col gap-1">
            {data?.map((record: any) => (
              <ul
                key={record.rankNo}
                className="flex items-center h-[75px] px-10 py-3 bg-gray-900 rounded-[8px] text-[16px] text-white"
              >
                <li className="w-20 text-center text-[24px]">
                  {record.rankNo}
                </li>
                <li className="flex flex-col gap-1 text-center w-70">
                  <span>{record.nickname}</span>
                  <span>{record.clubValue}</span>
                </li>
                <li className="text-center w-50">{record.rankingScore}</li>
                <li className="text-center w-50">
                  {record.record.win + record.record.draw + record.record.lose}
                  전 {record.win}승 {record.lose}패
                </li>
                <li className="text-center w-30">{record.odds}</li>
                <li className="flex justify-center text-center w-30">
                  <div className="relative overflow-hidden rounded-full w-15 h-15">
                    <Image src={record.rankBestImg} fill alt="최고등급" />
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

// {
//   "rankNo": 1,
//   "created_at": "2025-05-06T17:39:25.464517+00:00",
//   "nickname": "NSRimGC",
//   "clubValue": "667조 7,427억",
//   "level": 4715,
//   "rankingScore": 3532.11,
//   "record": {
//       "win": 222,
//       "draw": 6,
//       "lose": 55
//   },
//   "odds": 78.4,
//   "rankBestImg": "https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank0.png"
// }
