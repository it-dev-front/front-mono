import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "FCDB 랭킹 | FC 온라인 전적 검색",
  description: "FC 온라인 랭킹점수 검색 페이지입니다.",
  openGraph: {
    title: "FCDB 랭킹 | FC 온라인 전적 검색",
    description: "FC 온라인 랭킹점수 검색 페이지입니다.",
    images: [
      {
        url: "https://fcdb.co.kr/images/banner.png",
        width: 1200,
        height: 630,
        alt: "FCDB 랭킹 - FC 온라인 전적 검색",
      },
    ],
  },
};

const RankingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative w-full min-w-[366px] flex flex-col min-h-screen pt-[62px]">
      <div className="w-[887px] h-[485px] fixed bottom-0 left-0 z-0 mobile:hidden">
        <Image
          src="/images/ranking-bg.png"
          fill
          alt="ranking-bg"
          className="object-cover"
          priority
          sizes="887px 485px"
        />
      </div>
      <div className="flex flex-col items-center max-w-[1080px] flex-grow w-full m-auto z-1">
        <header className="flex justify-center items-center h-[160px] mx-auto text-[28px] w-full text-white mobile:h-[80px] mobile:text-[20px]">
          랭킹점수
        </header>

        <table className="w-full">
          <thead>
            <tr className="flex items-center h-[75px] w-full px-10 py-4 text-[20px] text-white mobile:text-[12px] mobile:px-[15px] mobile:py-[3px] mobile:h-[40px] mobile:justify-between">
              <th className="text-center w-20 mobile:w-10">순위</th>
              <th className="text-center w-70 mobile:w-20">구단주</th>
              <th className="text-center w-50 mobile:w-20">랭킹점수</th>
              <th className="text-center w-50 mobile:hidden">전적</th>
              <th className="text-center w-30 mobile:w-20">승률</th>
              <th className="text-center w-30 mobile:w-[50px]">최고등급</th>
            </tr>
          </thead>

          {children}
        </table>
      </div>
    </main>
  );
};

export default RankingLayout;
