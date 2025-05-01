"use client";

import { FcClient } from "@/entities/fc-database/lib/FcClient";
import { useQuery } from "@tanstack/react-query";

const MOCK_OUID = "99156cc13fbdadffb8c87df57f12f3ad";

export const UserProfileFetcher = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: () =>
      FcClient.get("User").then((api) => api.getUserInfo(MOCK_OUID)),
  });

  if (isLoading) return <div>롸</div>;

  console.log(data);

  return <div>성공</div>;
};
