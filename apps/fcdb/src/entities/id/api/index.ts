import { FCONLINE_API_URL } from "@/shared/constant/url";

export const getOuid = async (name: string) => {
  const url = `${FCONLINE_API_URL}/v1/id?nickname=${name}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-nxopen-api-key": process.env.FCONLINE_DEV_API_KEY as string,
    },
    next: {
      revalidate: 60 * 60, // 1시간 동안 캐시
    },
  });

  const data = await res.json();

  return data;
};
