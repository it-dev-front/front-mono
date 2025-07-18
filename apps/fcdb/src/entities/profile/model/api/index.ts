import { FcClient } from "@/entities/fc-database/lib/FcClient";

export const getUserProfileApi = async (ouid: string) => {
  const userApi = await FcClient.get("User");
  return await userApi.getUserInfo(ouid);
};

export const getBestRatingApi = async (ouid: string) => {
  const userApi = await FcClient.get("User");
  return await userApi.getUserBestRating(ouid);
};
