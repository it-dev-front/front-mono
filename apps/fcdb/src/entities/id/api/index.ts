import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { FCONLINE_API_URL } from "@/shared/constant/url";
import { unstable_cache } from "next/cache";

const getOuidApi = unstable_cache(
  async (nickname: string) => {
    const userApi = await FcClient.get("User");
    return await userApi.getOuid(nickname);
  },
  ["user-ouid"],
  {
    revalidate: 60 * 10,
    tags: ["user-search"],
  }
);

const getUserInfoApi = async (ouid: string) => {
  const url = `${FCONLINE_API_URL}/fconline/v1/user/basic?ouid=${ouid}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-nxopen-api-key": process.env.FCONLINE_PROD_API_KEY as string,
    },
    next: {
      revalidate: 60 * 60, // 1시간 동안 캐시
    },
  });

  const data = await res.json();

  return data;
};

const getUserBestRatingApi = async (ouid: string) => {
  const url = `${FCONLINE_API_URL}/fconline/v1/user/maxdivision?ouid=${ouid}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-nxopen-api-key": process.env.FCONLINE_PROD_API_KEY as string,
    },
    next: {
      revalidate: 60 * 60, // 1시간 동안 캐시
    },
  });

  const data = await res.json();

  return data;
};

export { getUserInfoApi, getUserBestRatingApi, getOuidApi };
