import { baseUrl } from "@/shared/constant/url";

export const getRanking = async (page: number, pageSize: number = 20) => {
  const response = await fetch(
    `${baseUrl}/api/rank?page=${page}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  return {
    data: result.data,
    error: result.error,
    hasNextPage: result.hasNextPage,
  };
};
