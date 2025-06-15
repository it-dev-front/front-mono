export const RankingTableHeader = () => {
  return (
    <thead>
      <tr className="flex items-center h-[75px] w-full px-10 py-4 text-[20px] text-white mobile:text-[12px] mobile:px-[15px] mobile:py-[3px]">
        <th className="text-center w-20 mobile:w-10">순위</th>
        <th className="text-center w-70 mobile:w-20">구단주</th>
        <th className="text-center w-50 mobile:w-20">랭킹점수</th>
        <th className="text-center w-50 mobile:hidden">전적</th>
        <th className="text-center w-30 mobile:w-20">승률</th>
        <th className="text-center w-30 mobile:w-[50px]">최고등급</th>
      </tr>
    </thead>
  );
};
