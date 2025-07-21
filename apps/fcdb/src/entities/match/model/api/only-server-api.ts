import { MatchDetailResponse } from "@/entities/fc-database/types";
import { unstable_cache } from "next/cache";
import { getMatchIdsApi, getMatchListApi } from ".";

export const onlyServerApi = {
  getMatchIds: async (
    ouid: string,
    page: number,
    limit: number
  ): Promise<string[]> => {
    return unstable_cache(
      async (): Promise<string[]> => getMatchIdsApi(ouid, page, limit),
      [`match-ids-${ouid}-${page}-${limit}`],
      {
        revalidate: 60 * 10,
        tags: ["match-ids"],
      }
    )();
  },
  getMatchList: async (matchIds: string[]): Promise<MatchDetailResponse[]> => {
    return unstable_cache(
      async (): Promise<MatchDetailResponse[]> => getMatchListApi(matchIds),
      [`match-list-${matchIds.join(",")}`],
      {
        revalidate: 60 * 10,
        tags: ["match-list"],
      }
    )();
  },
};
