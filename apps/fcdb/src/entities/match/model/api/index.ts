import { FcClient } from "@/entities/fc-database/lib/FcClient";

export const getMatchIdsApi = async (
  ouid: string,
  page: number,
  limit: number
) => {
  const userApi = await FcClient.get("User");
  const offset = (page - 1) * limit;
  return await userApi.getUserMatchList({
    ouid,
    matchtype: 50,
    limit,
    offset,
  });
};

export const getMatchListApi = async (matchIds: string[]) => {
  const matchApi = await FcClient.get("Match");
  const matchList = await Promise.all(
    matchIds.map(async (matchId) => matchApi.getMatchDetail(matchId))
  );
  return matchList;
};
