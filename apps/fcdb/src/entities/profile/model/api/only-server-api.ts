import { unstable_cache } from "next/cache";
import { getBestRatingApi, getUserProfileApi } from ".";

export const onlyServerApi = {
  getUserProfile: async (ouid: string) => {
    return unstable_cache(
      async () => getUserProfileApi(ouid),
      ["user-profile", ouid],
      {
        revalidate: 60 * 10,
        tags: ["user-profile"],
      }
    )();
  },
  getBestRating: async (ouid: string) => {
    return unstable_cache(
      async () => getBestRatingApi(ouid),
      ["user-best-rating", ouid],
      {
        revalidate: 60 * 10,
        tags: ["user-best-rating"],
      }
    )();
  },
};
