import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { MatchDetailResponse } from "@/entities/fc-database/types";

// 매치 리스트 불러오기
export const getMatchList = async (
  matchIds: string[]
): Promise<MatchDetailResponse[]> => {
  const matchApi = await FcClient.get("Match");
  const matchList = await Promise.all(
    matchIds.map(async (matchId) => matchApi.getMatchDetail(matchId))
  );

  return matchList;
};

// 매치 아이디 불러오기
export const getMatchIds = async (
  ouid: string,
  page: number,
  limit: number
): Promise<string[]> => {
  const userApi = await FcClient.get("User");
  const offset = (page - 1) * limit;

  return await userApi.getUserMatchList({
    ouid,
    matchtype: 50,
    limit,
    offset,
  });
};
